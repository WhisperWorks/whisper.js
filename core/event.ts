import { Events } from "discord.js"

type BotEventFiles = { [key: string]: string }

export const botEventFiles: BotEventFiles = {
  [Events.ClientReady]: "ready",
  [Events.ChannelCreate]: "channel-create",
  [Events.ChannelDelete]: "channel-delete",
  [Events.ChannelUpdate]: "channel-update",
  [Events.ChannelPinsUpdate]: "channel-pins-update",
  [Events.GuildCreate]: "guild-create",
  [Events.GuildDelete]: "guild-delete",
  [Events.GuildUpdate]: "guild-update",
  [Events.GuildBanAdd]: "guild-ban-add",
  [Events.GuildBanRemove]: "guild-ban-remove",
  [Events.GuildMemberAdd]: "guild-member-add",
  [Events.GuildMemberRemove]: "guild-member-remove",
  [Events.GuildMemberUpdate]: "guild-member-update",
  [Events.GuildRoleCreate]: "guild-role-create",
  [Events.GuildRoleDelete]: "guild-role-delete",
  [Events.GuildRoleUpdate]: "guild-role-update",
  [Events.MessageCreate]: "message-create",
  [Events.MessageDelete]: "message-delete",
  [Events.MessageUpdate]: "message-update",
  [Events.MessageReactionAdd]: "message-reaction-add",
  [Events.MessageReactionRemove]: "message-reaction-remove",
  [Events.MessageReactionRemoveAll]: "message-reaction-remove-all",
  [Events.PresenceUpdate]: "presence-update",
  [Events.TypingStart]: "typing-start",
  [Events.UserUpdate]: "user-update",
  [Events.InteractionCreate]: "interaction-create",
  [Events.ShardDisconnect]: "shard-disconnect",
  [Events.ShardError]: "shard-error",
  [Events.ShardReady]: "shard-ready",
  [Events.ShardReconnecting]: "shard-reconnecting",
  [Events.ShardResume]: "shard-resume"
}