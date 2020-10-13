<template>
  <div class="home">
    <Settings class="home__settings" />
    <Infos class="home__infos" />
    <Achievements class="home__achievements" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Achievements from '@/components/Achievements.vue'
import Infos from '@/components/Infos.vue'
import Settings from '@/components/Settings.vue'
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

interface GenericObject {
  [key: string]: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface GameData {
  name: string
  playerAchievements: GenericObject[]
  playerAvatar: string
  playerName: string
  playerGames: []
  totalAchievements: GenericObject[]
  hours: string
}

export default defineComponent({
  name: 'Home',
  components: {
    Achievements,
    Infos,
    Settings,
  },
  setup() {
    const getAllData = async () => {
      const d = await getData(
        getUserStatsForGame(),
        getSchemaForGame(),
        getPlayerSummaries(),
        getOwnedGames()
      )

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
    }

    getAllData()
  },
})
</script>

<style lang="scss" scoped></style>
