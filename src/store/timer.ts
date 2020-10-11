import { ref } from 'vue'
import {
  getData,
  getUserStatsForGame,
  getSchemaForGame,
  getPlayerSummaries,
  getOwnedGames,
} from '@/api/steam.ts'
import { player } from '@/store/player.ts'
import { game } from '@/store/game.ts'
import { achievements } from '@/store/achievements.ts'
import { picture, entries, search } from '@/store/howlongtobeat.ts'

const duration = 300

const timer = ref({
  time: duration,
})

const interval = ref()

const decrease = () => {
  timer.value.time -= 1
}

const start = () => {
  interval.value = setInterval(() => {
    if (timer.value.time <= 0) {
      timer.value.time = duration

      const getAllData = () => {
        const ownedGames = getOwnedGames()
        const userStatsForGame = getUserStatsForGame()
        const schemaForGame = getSchemaForGame()
        const playerSummaries = getPlayerSummaries()

        getData(
          userStatsForGame,
          schemaForGame,
          playerSummaries,
          ownedGames
        ).then(d => {
          player.value = Object.assign(player.value, {
            avatar: d.playerAvatar,
            name: d.playerName,
            owned: d.playerGames,
          })

          game.value = Object.assign(game.value, {
            name: d.name,
            hours: d.hours,
          })

          achievements.value = Object.assign(achievements.value, {
            completed: d.playerAchievements,
            total: d.totalAchievements,
          })

          search(d.name).then(d => {
            entries.value = d.entries
            picture.value = d.picture
          })
        })
      }

      getAllData()
    } else {
      decrease()
    }
  }, 1000)
}

const restart = () => {
  clearInterval(interval.value)
  start()
}

start()

export { timer, start, restart }
