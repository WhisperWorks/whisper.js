import { Client } from "discord.js";
import { Logger } from "../../core/logging";

export default async function ready(client: Client<true>) {
  Logger.info(`Ready on ${client.user.displayName}`)
}