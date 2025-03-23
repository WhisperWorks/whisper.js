export interface Command {
  name: string
  description: string
  integration_types: number[]
  contexts: number[]
  options?: {
    name: string
    description: string
    type: number
    required: boolean
  }[]
}

export interface Config {
  token: string
  clientID: string
  author: string
  commands: Command[]

  /* list of command names to limit the dev to */
  devOnly: string[]
}