import { GatewayIntentBits } from "discord.js"
import { SynxBot } from "../core/bot"

import "dotenv/config"

const bot = new SynxBot({
  token: process.env.TOKEN!,
  clientID: "1353249889857044510",
  author: "1303167712654131252",
  devOnly: [],
  commands: [
    {
      name: "hello",
      description: "hello",
      integration_types: [0, 1],
      contexts: [0, 1]
    }
  ]
}, [ 
  GatewayIntentBits.MessageContent, 
  GatewayIntentBits.MessageContent, 
  GatewayIntentBits.DirectMessages 
])

;(async () => await bot.start())()