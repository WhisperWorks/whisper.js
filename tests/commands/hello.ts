import { CacheType, ChatInputCommandInteraction } from "discord.js";

export default async function hello(interaction: ChatInputCommandInteraction<CacheType>) {
  return void await interaction.reply("Hello!")
}