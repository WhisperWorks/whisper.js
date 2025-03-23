import { WhisperInteraction } from "../../core/interaction"

export default async function hello(interaction: WhisperInteraction) {
  return void await interaction.reply("Hello!")
}