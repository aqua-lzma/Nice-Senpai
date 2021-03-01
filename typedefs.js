/**
 * Dab related info for a user
 * @typedef {object} NiceUser
 * @property {boolean} positive - defines whether they gain or lose dabs from daily rolls
 * @property {number} dabs - number of dabs user currently has
 * @property {number} highestDabs - highest dabs user has ever had
 * @property {number} lowestDabs - lowest dabs user has ever had
 * @property {number} lastGive - last day the user used give command
 * @property {number} givenPercent - percentage of total dabs given away today
 * @property {number} level - current level of user
 * @property {number} highestLevel - highest level user has ever had
 * @property {number} lowestLevel - lowest level user has ever had
 * @property {number} lastClaim - last time user used daily-roll command
 * @property {number} claimStreak - number of days in a row user has used daily-roll
 * @property {number} dailyWins - total number of dabs user has won from daily-roll (absolute)
 * @property {[number]} history - list of rolls achieved, singles, dubs, etc. to sextuples
 * @property {number} betTotal - total number of dabs user has bet (absolute)
 * @property {number} betWon - total number of dabs user has won (absolute)
 * @property {number} flipSteak - number of bet-flips won in a row
 * @property {[string]} badges - badges user has achieved
 */
export const templateUser = {
  // Overall
  positive: true,
  dabs: 0,
  highestDabs: 0,
  lowestDabs: 0,
  // Sharing
  lastGive: 0,
  givenPercent: 0,
  // Levels
  level: 0,
  highestLevel: 0,
  lowestLevel: 0,
  // Daily rolls
  lastClaim: 0,
  claimStreak: 0,
  dailyWins: 0,
  history: [0, 0, 0, 0, 0, 0],
  // Gambling
  betTotal: 0,
  betWon: 0,
  flipSteak: 0,
  // Badges
  badges: []
}

/**
 * [ApplicationCommand](https://discord.com/developers/docs/interactions/slash-commands#applicationcommand)
 * - A command, or each individual subcommand, can have a maximum of 10 `options`.
 * - An application command is the base "command" model that belongs to an application. This is what you are creating when you `POST` a new command.
 * @typedef {object} ApplicationCommand
 * @property {string?} id - unique id of the command
 * @property {string?} application_id - unique id of the parent application
 * @property {string} name - 3-32 character name matching `^[\w-]{3,32}$`
 * @property {string} description - 1-100 character description
 * @property {[ApplicationCommandOption]} [options] - The parameters for the command
*/

/**
 * [ApplicationCommandOption](https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption)
 * - You can specify a maximum of 10 `choices` per option.
 * @typedef {object} ApplicationCommandOption
 * @property {number} type - value of [ApplicationCommandOptionType](https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype)
 * @property {string} name - 1-32 character name matching `^[\w-]{1,32}$`
 * @property {string} description - 1-100 character description
 * @property {boolean} [required] - if the parameter is required or optional -- default `false`
 * @property {[ApplicationCommandOptionChoice]} [choices] - choices for `string` and `int` types for the user to pick from
 * @property {[ApplicationCommandOption]} [options] - if the option is a subcommand or subcommand group type, this nested options will be the parameters
 */

/**
 * [ApplicationCommandOptionChoice](https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptionchoice)
 * - If you specify `choices` for an option, they are the only valid values for a user to pick.
 * @typedef {object} ApplicationCommandOptionChoice
 * @property {string} name - 1-100 character choice name
 * @property {string | number} value - value of the choice
 */

/**
 * [User Object](https://discord.com/developers/docs/resources/user#user-object)
 * @typedef {object} User
 * @property {string} id - the user's id
 * @property {string} username - the user's username, not unique across the platform
 * @property {string} discriminator - the user's 4-digit discord-tag
 * @property {string?} avatar - the user's [avatar hash](https://discord.com/developers/docs/reference#image-formatting)
 * @property {boolean} [bot] - whether the user belongs to an OAuth2 application
 * @property {boolean} [system] - whether the user is an Official Discord System user (part of the urgent message system)
 * @property {boolean} [mfa_enabled] - whether the user has two factor enabled on their account
 * @property {string} [locale] - the user's chosen language option
 * @property {boolean} [verified] - whether the email on this account has been verified
 * @property {string?} [email] - the user's email
 * @property {integer} [flags] - the [flags](https://discord.com/developers/docs/resources/user#user-object-user-flags) on a user's account
 * @property {number} [premium_type] - the [type of Nitro subscription](https://discord.com/developers/docs/resources/user#user-object-premium-types) on a user's account
 * @property {number} [public_flags] - the public [flags](https://discord.com/developers/docs/resources/user#user-object-user-flags) on a user's account
 */

/**
 * [Guild Member Object](https://discord.com/developers/docs/resources/guild#guild-member-object)
 * - The field `user` won't be included in the member object attached to `MESSAGE_CREATE` and `MESSAGE_UPDATE` gateway events.
 * - In `GUILD_` events, `pending` will always be included as true or false. In non `GUILD_` events which can only be triggered by non-`pending` users, `pending` will not be included.
 * @typedef {object} GuildMember
 * @property {User} [user] - the user this guild member represents
 * @property {string?} [nick] - this users guild nickname
 * @property {[string]} roles - array of [role](https://discord.com/developers/docs/topics/permissions#role-object) object ids
 * @property {string} joined_at - ISO8601 timestamp when the user joined the guild
 * @property {string?} [premium_since] - ISO8601 timestamp when the user started [boosting](https://support.discord.com/hc/en-us/articles/360028038352-Server-Boosting-) the guild
 * @property {boolean} deaf - whether the user is deafened in voice channels
 * @property {boolean} mute - whether the user is muted in voice channels
 * @property {boolean} [pending] - whether the user has not yet passed the guild's [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object) requirements
 * @property {string} [permissions] - total permissions of the member in the channel, including overrides, returned when in the interaction object
 */

/**
 * [Interaction](https://discord.com/developers/docs/interactions/slash-commands#interaction)
 * - An interaction is the base "thing" that is sent when a user invokes a command, and is the same for Slash Commands and other future interaction types.
 * @typedef {object} Interaction
 * @property {string} id - id of the interaction
 * @property {number} type - the [type](https://discord.com/developers/docs/interactions/slash-commands#interaction-interactiontype) of interaction.
 * - Ping: `1`
 * - ApplicationCommand: `2`
 * @property {ApplicationCommandInteractionData} [data] - the command data payload.
 * - This is always present on ApplicationCommand interaction types.
 * - It is optional for future-proofing against new interaction types
 * @property {string} guild_id - the guild it was sent from
 * @property {string} channel_id - the channel it was sent from
 * @property {GuildMember} member - guild member data for the invoking user, including permissions
 * @property {string} token - a continuation token for responding to the interaction
 * @property {number} version - read-only property, always `1`
 */

/**
 * [ApplicationCommandInteractionData](https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondata)
 * @typedef {object} ApplicationCommandInteractionData
 * @property {string} id - the ID of the invoked command
 * @property {string} name - the name of the invoked command
 * @property {[ApplicationCommandInteractionDataOption]} [options] the params + values from the user
 */

/**
 * [ApplicationCommandInteractionDataOption](https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondataoption)
 * - All options have names, and an option can either be a parameter and input `value` -- in which case value will be set -- or it can denote a subcommand or group -- in which case it will contain a top-level key and another array of `options`.
 * - `value` and `options` are mutually exclusive.
 * @typedef {object} ApplicationCommandInteractionDataOption
 * @property {string} name - the name of the parameter
 * @property {string | number | boolean} [value] - the `ApplicationCommandOptionType` value of the pair
 * @property {[ApplicationCommandInteractionDataOption]} [options] - present if this option is a group or subcommand
 */

/**
 * [InteractionResponse](https://discord.com/developers/docs/interactions/slash-commands#interaction-response)
 * - After receiving an interaction, you must respond to acknowledge it. This may be a `pong` for a `ping`, a message, or simply an acknowledgement that you have received it and will handle the command async.
 * - Interaction responses may choose to "eat" the user's command input if you do not wish to have their slash command show up as message in chat. This may be helpful for slash commands, or commands whose responses are asynchronous or ephemeral messages.
 * @typedef {object} InteractionResponse
 * @property {number} type - the [type](https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionresponsetype) of response
 * @property {InteractionApplicationCommandCallbackData} [data] - an optional response message
 */

/**
 * [InteractionApplicationCommandCallbackData](https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata)
 * - Not all message fields are currently supported.
 * @typedef {object} InteractionApplicationCommandCallbackData
 * @property {boolean} [tts] - is the response TTS
 * @property {string} content - message content
 * @property {[object]} [embeds] - supports up to 10 embeds
 * @property {object} [allowed_mentions] - [allowed mentions](https://discord.com/developers/docs/resources/channel#allowed-mentions-object) object
 */
