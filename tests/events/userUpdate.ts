import { Logger } from "@whisperjs/whisper.js"
import { User } from "discord.js"

// filepath: c:\Users\Iyad\Desktop\whisper.js\tests\events\user-update.ts

export default async function userUpdate(oldUser: User, newUser: User) {
  Logger.info(`User updated: ${oldUser.tag} -> ${newUser.tag}`)
}