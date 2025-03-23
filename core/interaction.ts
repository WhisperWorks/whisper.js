import { ChatInputCommandInteraction, CacheType } from "discord.js"

export interface WhisperInteraction extends ChatInputCommandInteraction<CacheType> {
  // eventually there will be more functions and properties here
  // for the time being, this is essentially a type shortcut
}

export function modifyInteraction(
  interaction: ChatInputCommandInteraction<CacheType>, 
): WhisperInteraction {
  // actually create the custom interaction

  const whisperInteraction: WhisperInteraction = interaction as WhisperInteraction

  return whisperInteraction
}