import fs from "fs"
import { pathToFileURL } from "url"

import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js"

import { Config } from "./types"
import { Logger } from "./logging"
import { botEventFiles } from "./event"
import { modifyInteraction, WhisperInteraction } from "./interaction"

export class WhisperJS {
  private client: Client
  private rest: REST
  private dir: string
  private config: Config

  private commands: {
    [name: string]: {
      execute: (interaction: WhisperInteraction) => Promise<undefined>
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
      body: this.config.commands,
    })

    this.config.commands.forEach(async command => {
      this.commands[command.name] = {
        execute: (await import(`${this.dir}/commands/${command.name}`)).default.default,
      }
    })

    try {
      const files = await fs.promises.readdir(`./events`)

      Logger.info("Loading event functions")
      Logger.info(files.join(", "))

      for (const file of files) {
        this.events[file.replace(/\.ts$/, "")] = {
          execute: (await import(`${this.dir}/events/${file}`)).default.default
        }
      }
    } catch (err) {
      Logger.error((err as Error).message)
      Logger.error("Failed to load events")
    }
  }
  
  async start() {
    Logger.info("Registering bot commands")
    
    await this.registerCommands()
    .then(() => {
      Logger.info("Registered bot commands")
    })
    .catch(err => {
      Logger.error("Registering bot commands failed, please check your configs")
      Logger.error(err as string)
      return
    })
    
    Logger.info(JSON.stringify(this.events, null, 2))
    // we basically just import the file and execute the function with the event as argument
    Object.keys(botEventFiles).forEach(eventName => {
      if (!this.events[eventName]) {
        Logger.warn(`No event handler found for: ${eventName}`)
      } else {
        this.client.on(eventName, async (...args: [any]) => {
          const eventHandler = this.events[eventName]
          console.log(eventName, eventHandler)
          if (eventHandler) {
            await eventHandler.execute(...args)
          } else {
            Logger.error(`No handler found for event: ${eventName}`)
          }
        })     
      } 
    })

    this.client.on(Events.InteractionCreate, async interaction => {
      if (!interaction.isChatInputCommand()) return

      if (!this.commands[interaction.commandName]) {
        return void (await interaction.reply("Command not found. Contact the bot developer for help."))
      }

      if (this.config.devOnly.includes(interaction.commandName)) {
        return void (await interaction.reply("This is a dev only command."))
      }

      return void (await this.commands[interaction.commandName].execute(modifyInteraction(interaction)))
    })

    this.client.login(this.config.token)
  }
}