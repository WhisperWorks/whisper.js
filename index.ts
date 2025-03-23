/**
 * made with <3 by 1xxcy
 */

import { WhisperJS as wjs } from "./core/bot"
import { Logger as logger } from "./core/logging"
import { WhisperInteraction as wsi } from "./core/interaction"

/**
 * Whisper namespace
 * @deprecated Use respective imports instead
 */
export namespace Whisper {
  export const WhisperJS = wjs
  export const Logger = logger
  export type WhisperInteraction = wsi
}

export const WhisperJS = wjs
export const Logger = logger

export type WhisperInteraction = wsi