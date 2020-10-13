/* eslint-disable @typescript-eslint/no-explicit-any */

/*
 * Can be cached ?
 * userStatsForGame : false for achievements
 * schemaForGame : true unless new achievements
 * playerSummaries : true unless change in the profile
 * ownedGames : false for playtime_forever
 */

import * as settings from '@/store/settings'

interface GameData {
  name: string
  playerAchievements: Record<string, any>[]
  playerAvatar: string
  playerName: string
  playerGames: Record<string, any>[]
  totalAchievements: Record<string, any>[]
  hours: string
}

const corsAnywhere = 'https://cors-anywhere.herokuapp.com/'
const steamURL = {
  userStatsForGame: `${corsAnywhere}http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/`,
  getSchemaForGame: `${corsAnywhere}http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/`,
  getPlayerSummaries: `${corsAnywhere}http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/`,
  getOwnedGames: `${corsAnywhere}http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/`,
}

const getUserStatsForGame = async () => {
  const storageKey = 'userStatsForGame'

  // const stored = localStorage.getItem(storageKey);
  // if (stored) {
  //   return JSON.parse(stored);
  // }

  const url = `${steamURL.userStatsForGame}?key=${settings.key.value}&steamid=${settings.steamid.value}&appid=${settings.appid.value}`
  const data = await fetch(url).then(response => response.json())

  localStorage.setItem(storageKey, JSON.stringify(data))

  return data
}

const getSchemaForGame = async () => {
  const storageKey = 'schemaForGame'

  // const stored = localStorage.getItem(storageKey)
  // if (stored) {
  //   return JSON.parse(stored)
  // }

  const url = `${steamURL.getSchemaForGame}?key=${settings.key.value}&appid=${settings.appid.value}`
  const data = await fetch(url).then(response => response.json())

  localStorage.setItem(storageKey, JSON.stringify(data))

  return data
}

const getPlayerSummaries = async () => {
  const storageKey = 'playerSummaries'

  const stored = localStorage.getItem(storageKey)
  if (stored) {
    return JSON.parse(stored)
  }

  const url = `${steamURL.getPlayerSummaries}?key=${settings.key.value}&steamids=${settings.steamid.value}`
  const data = await fetch(url).then(response => response.json())

  localStorage.setItem(storageKey, JSON.stringify(data))

  return data
}

const getOwnedGames = async () => {
  const storageKey = 'ownedGames'
  const url = `${steamURL.getOwnedGames}?key=${settings.key.value}&steamid=${settings.steamid.value}&include_appinfo=1`
  const data = await fetch(url).then(response => response.json())

  localStorage.setItem(storageKey, JSON.stringify(data))

  return data
}

const formatHour = (min: number) => {
  const hours = min / 60

  return `${Math.round(hours * 10) / 10} hours`
}

const getData = async (
  userStatsForGame: Promise<Record<string, any>>,
  schemaForGame: Promise<Record<string, any>>,
  playerSummaries: Promise<Record<string, any>>,
  ownedGames: Promise<Record<string, any>>
) => {
  return Promise.all([
    userStatsForGame,
    schemaForGame,
    playerSummaries,
    ownedGames,
  ]).then(values => {
    const [user, schema, summaries, owned] = values

    const obj: GameData = {
      name: owned.response.games.find(
        (g: Record<string, any>) => g.appid == settings.appid.value
      ).name,
      playerAchievements: user.playerstats.achievements
        ? user.playerstats.achievements.map((a: Record<string, any>) => a.name)
        : [],
      playerAvatar: summaries.response.players[0].avatarfull,
      playerName: summaries.response.players[0].personaname,
      playerGames: owned.response.games.sort(
        (a: Record<string, string>, b: Record<string, any>) =>
          a.name.localeCompare(b.name)
      ),
      totalAchievements: schema.game.availableGameStats.achievements,
      hours: formatHour(
        owned.response.games.find(
          (g: Record<string, any>) => g.appid == settings.appid.value
        ).playtime_forever
      ),
    }

    return obj
  })
}

export {
  getData,
  getUserStatsForGame,
  getSchemaForGame,
  getPlayerSummaries,
  getOwnedGames,
}
