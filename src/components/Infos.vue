<template>
  <div class="infos">
    <div class="infos__avatar-outer">
      <img class="infos__avatar" :src="player.avatar" alt="Player avatar" />
    </div>
    <div class="infos__name">
      {{ player.name }}
    </div>
    <div class="infos__game">
      {{ game.name }}
    </div>
    <div class="infos__hours">
      {{ game.hours }}
    </div>
    <div class="infos__progress">
      <div class="infos__progress__bar">
        <div
          class="infos__progress__bar__fill"
          :style="`width: ${achievements.percent}%;`"
        ></div>
      </div>
      <div class="infos__progress__value">
        {{ achievements.completed.length }} /
        {{ achievements.total.length }} ({{ achievements.percent }}%)
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.infos {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid black;
  background-color: #333;
  color: #fff;
}

.infos__avatar-outer {
  position: relative;
  width: 100px;

  &::before {
    content: '';
    display: block;
    width: 100%;
    padding-top: (1 / 1) * 100%;
  }
}

.infos__avatar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.infos__name {
  margin-top: 5px;
}

.infos__game {
  margin-top: 20px;
}

.infos__hours {
  margin-top: 5px;
}

.infos__progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  font-size: 13px;
  line-height: 1.2em;
}

.infos__progress__bar {
  position: relative;
  overflow: hidden;
  width: 130px;
  height: 10px;
  background-color: #fff;
  border-radius: 5px;
}

.infos__progress__bar__fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: black;
}

.infos__progress__value {
  margin-top: 3px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import { player } from '@/store/player.ts'
import { game } from '@/store/game.ts'
import { achievements } from '@/store/achievements.ts'

export default defineComponent({
  name: 'Infos',
  setup() {
    return {
      achievements,
      game,
      player,
    }
  },
})
</script>
