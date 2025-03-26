import { Client } from "discord.js";
import { Logger } from "@whisperjs/whisper.js"

export default async function ready(client: Client<true>) {
  Logger.info(`Ready on ${client.user.displayName}`)
}