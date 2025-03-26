import { WhisperInteraction } from "@whisperjs/whisper.js"

export default async function hello(interaction: WhisperInteraction) {
  return void await interaction.reply("Hello!")
}