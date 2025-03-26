import { ChatInputCommandInteraction, Client, Events, GatewayIntentBits, REST, Routes } from "discord.js"
import { Config } from "./types"
import { Logger } from "./logging"

import fs from "fs"
import { modifyInteraction } from "./interaction"
import { fileURLToPath, pathToFileURL } from "url"

export class WhisperJS {
  private client: Client
  private rest: REST
  private dir: string
  private config: Config

  private commands: {
    [name: string]: {
      execute: (interaction: ChatInputCommandInteraction) => Promise<undefined>
    }
  }

  private events: {
    [name: string]: {
      execute: (arg: any) => Promise<void>
    }
  }
  
  constructor(config: Config, intents: GatewayIntentBits[]) {
    this.config = config
    this.rest = new REST({ version: "10" }).setToken(this.config.token)
    this.client = new Client({ intents })
    this.dir = process.cwd()
    if (process.platform === "win32") {
      this.dir = pathToFileURL(this.dir).href
    }
    this.commands = {}
    this.events = {}
  }

  private async registerCommands() {
    await this.rest.put(Routes.applicationCommands(this.config.clientID), {
      body: this.config.commands
    })

    /* import all commands, and events */
    this.config.commands.forEach(async command => {
      this.commands[command.name] = {
        execute: (await import(`${this.dir}/commands/${command.name}`)).default.default
      }
    })

    fs.readdir(`./events`, (err, files) => {
      if (err) {
        Logger.error(err.message)
        return void Logger.error("Failed to load events")
      }

      files.forEach(async file => {
        this.events[file.replace(/\.ts$/, "")] = {
          execute: (await import(`${this.dir}/events/${file}`)).default.default
        }
        this.events
      })
    })
  }

  async start() {
    Logger.info("Registering bot commands")

    await this.registerCommands()
      .then(() => {
        Logger.info("Registered bot commands")
      })
      .catch((err) => {
        Logger.error("Registering bot commands failed, please check your configs")
        Logger.error(err as string)
        return
      })

    this.client.on(Events.ClientReady, client => {
      try {
        this.events.ready.execute(client)
      } catch(err) {
        Logger.warn("No on-ready event registered")
        Logger.warn(err as string)
      }
    })

    this.client.on(Events.InteractionCreate, async interaction => {
      if (!interaction.isChatInputCommand()) return

      if (!this.commands[interaction.commandName]) {
        return void await interaction.reply("Command not found. Contact the bot developer for help.")
      }

      if (this.config.devOnly.includes(interaction.commandName)) {
        return void await interaction.reply("This is a dev only command.")
      }

      return void await this.commands[interaction.commandName].execute(modifyInteraction(interaction))
    })

    this.client.login(this.config.token)
  }
}