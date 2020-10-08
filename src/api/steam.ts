interface GameData {
  name: string
  playerAchievements: Record<string, string>[]
  playerAvatar: string
  playerName: string
  totalAchievements: Record<string, string>[]
  hours: string
}

const corsAnywhere = 'https://cors-anywhere.herokuapp.com/'
const steamid = localStorage.getItem('steamid')
const appid = '250900' // binding of isaac rebirth
// const appid = "1145360"; // hades
const key = localStorage.getItem('key')

// Can be cached ?
// userStatsForGame : false for achievements
// schemaForGame : true unless new achievements
// playerSummaries : true unless change in the profile
// ownedGames : false for playtime_forever

const getUserStatsForGame = async () => {
  const storageKey = 'userStatsForGame'

  // const stored = localStorage.getItem(storageKey);
  // if (stored) {
  //   return JSON.parse(stored);
  // }

  const url = `${corsAnywhere}http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?key=${key}&steamid=${steamid}&appid=${appid}`

  const data = await fetch(url).then(response => response.json())

  localStorage.setItem(storageKey, JSON.stringify(data))

  return data
}

const getSchemaForGame = async () => {
  const storageKey = 'schemaForGame'

  const stored = localStorage.getItem(storageKey)
  if (stored) {
    return JSON.parse(stored)
  }

  const url = `${corsAnywhere}http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${key}&appid=${appid}`

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

  const url = `${corsAnywhere}http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${steamid}`

  const data = await fetch(url).then(response => response.json())

  // localStorage.setItem(storageKey, JSON.stringify(data))

  return data
}

const getOwnedGames = async () => {
  const storageKey = 'ownedGames'

  const url = `${corsAnywhere}http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${steamid}`

  const data = await fetch(url).then(response => response.json())

  debugger

  localStorage.setItem(storageKey, JSON.stringify(data))

  return data
}

const formatHour = (min: number) => {
  const hours = min / 60

  return `${Math.round(hours * 10) / 10} hours`
}

const getData = async (
  userStatsForGame,
  schemaForGame,
  playerSummaries,
  ownedGames
) => {
  return Promise.all([
    userStatsForGame,
    schemaForGame,
    playerSummaries,
    ownedGames,
  ]).then(values => {
    const [user, schema, summaries, owned] = values

    const obj: GameData = {
      name: schema.game.gameName,
      playerAchievements: user.playerstats.achievements.map(a => a.name),
      playerAvatar: summaries.response.players[0].avatarfull,
      playerName: summaries.response.players[0].personaname,
      totalAchievements: schema.game.availableGameStats.achievements,
      hours: formatHour(
        owned.response.games.find(g => g.appid == appid).playtime_forever
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
