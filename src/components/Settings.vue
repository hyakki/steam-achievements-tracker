<template>
  <div class="settings">
    <form class="settings__form" @submit.prevent="onSubmit" ref="form">
      <select class="settings__form__item" v-model="appid">
        <option
          :value="game.appid"
          v-for="game in player.owned"
          :key="`game-${game.appid}`"
        >
          {{ game.name }}
        </option>
      </select>
      <input
        class="settings__form__item"
        type="password"
        placeholder="steamid"
        v-model="steamid"
        required
      />
      <input
        class="settings__form__item"
        type="password"
        placeholder="key"
        v-model="key"
        required
      />
      <button class="settings__form__item" type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { player } from '@/store/player.ts'
import {
  getData,
  getUserStatsForGame,
  getSchemaForGame,
  getPlayerSummaries,
  getOwnedGames,
} from '@/api/steam.ts'
import { game } from '@/store/game.ts'
import { achievements } from '@/store/achievements.ts'
import { picture, entries, search } from '@/store/howlongtobeat.ts'

export default defineComponent({
  name: 'Settings',
  setup() {
    const appid = ref(localStorage.getItem('appid'))
    const steamid = ref(localStorage.getItem('steamid'))
    const key = ref(localStorage.getItem('key'))
    const form = ref()

    const onSubmit = () => {
      appid.value && localStorage.setItem('appid', appid.value)
      steamid.value && localStorage.setItem('steamid', steamid.value)
      key.value && localStorage.setItem('key', key.value)

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

      console.log(getAllData)
      // getAllData()
    }

    return {
      appid,
      form,
      key,
      player,
      onSubmit,
      steamid,
    }
  },
})
</script>

<style lang="scss" scoped>
.settings {
  position: relative;
  padding: 10px;
  background-color: #292929;
}

.settings__form {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.settings__form__item {
  margin-right: 5px;
}
</style>
