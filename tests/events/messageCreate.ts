import { Logger } from "@whisperjs/whisper.js"
import { Message } from "discord.js"

export default async function messageCreate(message: Message) {
  Logger.info(`Message received from ${message.author.tag}: ${message.content}`)
}
