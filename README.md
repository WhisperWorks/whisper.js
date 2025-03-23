# whisper.js

a highly experimental discord.js framework for making bot development super easy.

## install

by the time this goes public there will be an npm package for it.

## contribute

contributing to this project would be very heavily appreciated. this is just a passion and hobby project i started for fun, and i am by no means a good programmer, i just write random stuff and pray it works.

## docs

basic docs (in the future this will be a fancy website)

### bot.config

this property contains the configuration you passed to the `WhisperJS` class. it cannot be accessed within commands or events (as of yet).

| key   | type        | description          |
|-------|-------------|----------------------|
| token  | `string`      | the discord bot token (stored within an environment variable, as demonstrated in `tests/demo.ts`) |
| clientID   | `string`         | the bot client id - used to register slash commands   |
| author | `string`      | the bot author's user id (used for dev commands)     |
| commands | `Command[]`      | a list of bot commands to register to the REST api, refer to `core/types.ts` for more information on how this type looks like |
| devOnly | `string[]`      | a list of dev command names (as strings) - which can only be accessed by the author provided in `bot.config.author`     |

### basic command example

> commands/test.ts
```ts
import { CacheType, ChatInputCommandInteraction } from "discord.js"

export default async function test(interaction: ChatInputCommandInteraction<CacheType>) {
  return void await interaction.reply("Hello!")
}
```

### basic event example

> events/ready.ts
```ts
import { Client } from "discord.js"
import { Logger } from "../../core/logging"

export default async function ready(client: Client<true>) {
  Logger.info(`Ready on ${client.user.displayName}`)
}
```

## roadmap

[x] slash commands

[ ] events (more than just on ready...)

[ ] more interaction functions

[ ] prefix commands (possibly)
