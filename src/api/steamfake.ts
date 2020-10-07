const appid = '250900' // binding of isaac rebirth

interface GenericObject {
  [key: string]: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface GameData {
  name: string
  playerAchievements: GenericObject[]
  playerAvatar: string
  playerName: string
  totalAchievements: GenericObject[]
  hours: string
}

import userStatsForGame from './userStatsForGame.js'
import schemaForGame from './schemaForGame.js'
import playerSummaries from './playerSummaries.js'
import ownedGames from './ownedGames.js'

const getUserStatsForGame = () => {
  return new Promise(resolve => {
    resolve(userStatsForGame)
  })
}

const getSchemaForGame = () => {
  return new Promise(resolve => {
    resolve(schemaForGame)
  })
}

const getPlayerSummaries = () => {
  return new Promise(resolve => {
    resolve(playerSummaries)
  })
}

const getOwnedGames = () => {
  return new Promise(resolve => {
    resolve(ownedGames)
  })
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
