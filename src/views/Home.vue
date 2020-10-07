<template>
  <div class="home">
    <div class="data" v-if="data">
      <Infos
        :name="data.playerName"
        :game="data.name"
        :avatar="data.playerAvatar"
        :hours="data.hours"
        :achieved="data.playerAchievements.length"
        :total="data.totalAchievements.length"
      />

      <Achievements
        :player="data.playerAchievements"
        :total="data.totalAchievements"
        :name="data.name"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Infos from '@/components/Infos.vue'
import Achievements from '@/components/Achievements.vue'
import {
  getData,
  getUserStatsForGame,
  getSchemaForGame,
  getPlayerSummaries,
  getOwnedGames,
} from '@/api/steamfake.ts'

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
    const data = ref<null | GameData>(null)

    const userStatsForGame = getUserStatsForGame()
    const schemaForGame = getSchemaForGame()
    const playerSummaries = getPlayerSummaries()
    const ownedGames = getOwnedGames()

    getData(userStatsForGame, schemaForGame, playerSummaries, ownedGames).then(
      d => (data.value = d)
    )

    return {
      data,
    }
  },
})
</script>
