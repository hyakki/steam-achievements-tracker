<template>
  <div class="home">
    <Infos />
    <Achievements />
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { defineComponent } from 'vue'
import Infos from '@/components/Infos.vue'
import Achievements from '@/components/Achievements.vue'
import {
  getData,
  getUserStatsForGame,
  getSchemaForGame,
  getPlayerSummaries,
  getOwnedGames,
} from '@/api/steamfake.ts'
import { player } from '@/store/player.ts'
import { game } from '@/store/game.ts'
import { achievements, mark } from '@/store/achievements.ts'

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

export default defineComponent({
  name: 'Home',
  components: {
    Infos,
    Achievements,
  },
  setup() {
    const userStatsForGame = getUserStatsForGame()
    const schemaForGame = getSchemaForGame()
    const playerSummaries = getPlayerSummaries()
    const ownedGames = getOwnedGames()

    setTimeout(() => {
      getData(
        userStatsForGame,
        schemaForGame,
        playerSummaries,
        ownedGames
      ).then(d => {
        player.value = Object.assign(player.value, {
          avatar: d.playerAvatar,
          name: d.playerName,
        })

        game.value = Object.assign(game.value, {
          name: d.name,
          hours: d.hours,
        })

        achievements.value = Object.assign(achievements.value, {
          completed: d.playerAchievements,
          total: d.totalAchievements,
        })
      })
    }, 1000)
  },
})
</script>
