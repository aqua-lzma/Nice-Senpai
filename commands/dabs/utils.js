import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

/**
 * Dab related info for a user
 * @typedef {object} NiceUser
 * @property {boolean} positive - defines whether they gain or lose dabs from daily rolls
 * @property {number} dabs - number of dabs user currently has
 * @property {number} highestDabs - highest dabs user has ever had
 * @property {number} lowestDabs - lowest dabs user has ever had
 * @property {number} lastGiveDate - last day the user used give command
 * @property {number} percentGiven - percentage of total dabs given away today
 * @property {number} totalGive - total dabs gifted to other users (absolute)
 * @property {number} totalBadGive - total dabs destroying other users dabs given (absolute)
 * @property {number} totalGot - total dabs gifted from other users (absolute)
 * @property {number} totalBadGot - total dabs destryed by other users gives (absolute)
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
  // Trading
  lastGiveDate: 0,
  percentGiven: 0,
  totalGive: 0,
  totalBadGive: 0,
  totalGot: 0,
  totalBadGot: 0,
  // Levels
  level: 0,
  highestLevel: 0,
  lowestLevel: 0,
  levelsDestroyed: 0,
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

const rootDir = dirname(dirname(dirname(fileURLToPath(import.meta.url))))
const userDataDir = join(rootDir, 'data', 'users')

/**
 * Flavour text for bet-roll and daily-roll
 * @param {number} dubs - Type of win `0` - `5`
 */
export function dubsFlavour (dubs) {
  switch (dubs) {
    case 0:
      return '*Singles, no payout.*'
    case 1:
      return '*Dubs!*'
    case 2:
      return '**Trips!**'
    case 3:
      return '**QUADS!**'
    case 4:
      return '***QUINTUPLES!!!***'
    case 5:
      return '***S E X T U P L E S ! ! !***'
  }
}

/**
 * Emoji sets for displaying big numbers
 * - Indexed 0 to 9
 * @type {{name:[string]}}
 */
const numberSets = {
  normal: [':zero:', ':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:'],
  ebil: [
    '<:ebil0:817402896895049729>',
    '<:ebil1:817402896730554430>',
    '<:ebil2:817402897078681690>',
    '<:ebil3:817402897020616704>',
    '<:ebil4:817402897024679996>',
    '<:ebil5:817402897057710090>',
    '<:ebil6:817402897117085746>',
    '<:ebil7:817402897025073182>',
    '<:ebil8:817402896941187165>',
    '<:ebil9:817402897028743248>'
  ]
}
/**
 * Converts a string of numbers to Discord number emojis
 * @param {string} string - string of numbers `[0-9]` only
 * @param {'normal' | 'ebil'} set - emoji set to use
 */
export function emojiNumbers (string, set = 'normal') {
  for (let i = 0; i < 10; i++) {
    string = string.replace(RegExp(`(?<=^\\d*|>\\d*)${i}(?=\\d*$|\\d*<)`, 'g'), numberSets[set][i])
  }
  return string
}

/**
 * Format number to string SI suffix and a width of 5
 * @param {number} n
 */
export function formatNumber (n) {
  let s = `    ${n}`
  s = s.slice(-5)
  return s
}

/**
 * Read user from file
 * @param {string} userID
 * @returns {NiceUser} user object tied to ID
 */
export function readUser (userID) {
  const filePath = join(userDataDir, userID + '.json')
  try {
    const user = JSON.parse(readFileSync(filePath, 'utf8'))
    return user
  } catch {
    writeFileSync(filePath, JSON.stringify(templateUser), 'utf8')
    return { ...templateUser }
  }
}

/**
 * Save user to file
 * @param {string} userID
 * @param {NiceUser} userData
 */
export function saveUser (userID, userData) {
  const filePath = join(userDataDir, userID + '.json')
  writeFileSync(filePath, JSON.stringify(userData), 'utf8')
}

/**
 * Gambling restrictions check
 * @param {number} amount - bet amount
 * @param {number} dabs - current dabs user has
 * @returns {string?} `null` if ok, otherwise `string` reason for failure
 */
export function validateGambleInput (amount, dabs) {
  if (dabs === 0) return 'Cannot bet while holding 0 dabs.'
  if (amount < 0 && dabs > 0) return 'Cannot bet negative dabs while holding a positive amount.'
  if (amount > 0 && dabs < 0) return 'Cannot bet positive dabs while holding a negative amount.'
  if (
    (dabs > 0 && amount > dabs) ||
    (dabs < 0 && amount < dabs)
  ) return 'Not enough dabs.'
}

/**
 * Giving restrictions check
 * @param {number} amount - bet amount
 * @param {number} dabs - current dabs user has
 * @param {number} given - percentage user has given today
 * @returns {string?} `null` if ok, otherwise `string` reason for failure
 */
export function validateGiveInput (amount, dabs, given) {
  if (dabs === 0) return 'Cannot give dabs while holding 0.'
  if (given >= 0.5) return "You've already given half your dabs today."
  if (amount === 0) return 'The remaining percentage of your current dabs you can give away today is not a whole number.'
  if (amount < 0 && dabs > 0) return 'Cannot give negative dabs while holding a positive amount.'
  if (amount > 0 && dabs < 0) return 'Cannot give positive dabs while holding a negative amount.'
  if (
    ((amount > (0.5 - given) * dabs) && dabs > 0) ||
    ((amount < (0.5 - given) * dabs) && dabs < 0)
  ) return 'Cannot give more than half your dabs in 1 day.'
  if (
    (dabs > 0 && amount > dabs) ||
    (dabs < 0 && amount < dabs)
  ) return 'Not enough dabs.'
}
