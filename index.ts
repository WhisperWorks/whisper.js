/**
 * made with <3 by 1xxcy
 */

import { WhisperJS as WJS } from "./core/bot"
import { Logger as LGGR } from "./core/logging"
import { WhisperInteraction as WHSPINT } from "./core/interaction"

export namespace Whisper {
  export const WhisperJS = WJS
  export const Logger = LGGR
  export type WhisperInteraction = WHSPINT
}