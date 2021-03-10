/**
 * @module dabs-struct Command structure for `dab` commands
 */
import '../../typedefs.js'
import { ApplicationCommandOptionType } from '../../enums.js'

/**
 * @type {ApplicationCommand}
*/
const struct = {
  name: 'dabs',
  description: 'Dab related commands',
  options: [{
    type: ApplicationCommandOptionType.SUB_COMMAND,
    name: 'check',
    description: 'Check how many dabs you or someone else has',
    options: [{
      type: ApplicationCommandOptionType.BOOLEAN,
      name: 'detailed',
      description: 'Make the output detailed?'
    }, {
      type: ApplicationCommandOptionType.USER,
      name: 'user',
      description: 'User to check'
    }]
  }, {
    type: ApplicationCommandOptionType.SUB_COMMAND,
    name: 'daily-roll',
    description: 'Roll your daily rolls for some daily dabs'
  }, {
    type: ApplicationCommandOptionType.SUB_COMMAND,
    name: 'level',
    description: 'Level up, or down if you are in ebil mode',
    options: [{
      type: ApplicationCommandOptionType.INTEGER,
      name: 'amount',
      description: 'Number of times to try to level up. 0 means maximum possible level',
      required: true
    }, {
      type: ApplicationCommandOptionType.BOOLEAN,
      name: 'dry-run',
      description: 'Dry-run will only show the cost of leveling up. Default true'
    }]
  }, {
    type: ApplicationCommandOptionType.SUB_COMMAND,
    name: 'give',
    description: 'Give some of your dabs to a different user. Maximum of 50% of your total dabs a day',
    options: [{
      type: ApplicationCommandOptionType.USER,
      name: 'user',
      description: 'User to give dabs to',
      required: true
    }, {
      type: ApplicationCommandOptionType.INTEGER,
      name: 'dabs',
      description: 'Number of dabs to give. 0 means all of your current dabs',
      required: true
    }]
  }, {
    type: ApplicationCommandOptionType.SUB_COMMAND,
    name: 'leaderboards',
    description: 'Check the current server leaderboards',
    options: [{
      type: ApplicationCommandOptionType.STRING,
      name: 'sort-by',
      description: 'Which value to sort by for the leaderboards. Default is current dabs',
      choices: [{
        name: 'current dabs', value: 'dabs'
      }, {
        name: 'highest dabs', value: 'highestDabs'
      }, {
        name: 'lowest dabs', value: 'lowestDabs'
      }, {
        name: 'current level', value: 'level'
      }, {
        name: 'highest level', value: 'highestLevel'
      }, {
        name: 'lowest level', value: 'lowestLevel'
      }]
    }, {
      type: ApplicationCommandOptionType.STRING,
      name: 'type',
      description: 'Type of leaderboards to show. Default is positive',
      choices: [{
        name: 'positive', value: 'positive'
      }, {
        name: 'negative', value: 'negative'
      }]
    }]
  }, {
    type: ApplicationCommandOptionType.SUB_COMMAND,
    name: 'switch-mode',
    description: 'Change from nice to ebil mode (or vice versa). WARNING: Level will be reset to 0!'
  }, {
    type: ApplicationCommandOptionType.SUB_COMMAND,
    name: 'bet-roll',
    description: 'Bet dabs on a roll from 0 to 100, the higher the number the better the payout',
    options: [{
      type: ApplicationCommandOptionType.INTEGER,
      name: 'dabs',
      description: 'Number of dabs to bet',
      required: true
    }]
  }, {
    type: ApplicationCommandOptionType.SUB_COMMAND,
    name: 'bet-flip',
    description: 'Bet dabs on a coin flip',
    options: [{
      type: ApplicationCommandOptionType.STRING,
      name: 'choice',
      description: 'Your choice of heads or tails',
      required: true,
      choices: [{
        name: 'heads', value: 'heads'
      }, {
        name: 'tails', value: 'tails'
      }]
    }, {
      type: ApplicationCommandOptionType.INTEGER,
      name: 'dabs',
      description: 'Number of dabs to bet. 0 means all of your current dabs',
      required: true
    }]
  }, {
    type: ApplicationCommandOptionType.SUB_COMMAND,
    name: 'bet-dubs',
    description: 'Bet dabs on a random number from 0 to 1000000 being dubs or better',
    options: [{
      type: ApplicationCommandOptionType.INTEGER,
      name: 'dabs',
      description: 'Number of dabs to bet. 0 means all of your current dabs',
      required: true
    }]
  }]
}
export default struct
