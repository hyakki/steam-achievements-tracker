<template>
  <div class="infos">
    <div class="infos-inner">
      <div class="infos__player">
        <div class="infos__player__avatar-outer">
          <img
            class="infos__player__avatar"
            :src="player.avatar"
            alt="Player avatar"
          />
        </div>
        <div class="infos__player__name">
          {{ player.name }}
        </div>
      </div>

      <div class="infos__game">
        <div class="infos__game__picture-outer">
          <img
            class="infos__game__picture"
            :src="picture"
            alt="How long to beat picture"
          />
        </div>
        <div class="infos__game-inner">
          <div class="infos__game__name">
            {{ game.name }}
          </div>
          <div class="infos__game__spent">
            {{ game.hours }}
          </div>
          <div class="infos__game__entries">
            <div
              class="infos__game__entry"
              v-for="(entry, index) in entries"
              :key="`hltb-entry-${index}`"
            >
              {{ entry[0] }}: {{ entry[1] }}
            </div>
          </div>
          <div class="infos__game__progress">
            <div class="infos__game__progress__bar">
              <div
                class="infos__game__progress__bar__fill"
                :style="`width: ${percent}%;`"
              ></div>
            </div>
            <div class="infos__game__progress__value">
              {{ achievements.completed.length }} /
              {{ achievements.total.length }} ({{ percent }}%)
            </div>
          </div>
        </div>
      </div>

      <Timer class="infos__timer" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { player } from '@/store/player.ts'
import { game } from '@/store/game.ts'
import { achievements, percent } from '@/store/achievements.ts'
import { entries, picture } from '@/store/howlongtobeat.ts'
import Timer from '@/components/Timer.vue'

export default defineComponent({
  name: 'Infos',
  components: {
    Timer,
  },
  setup() {
    return {
      achievements,
      entries,
      game,
      percent,
      picture,
      player,
    }
  },
})
</script>

<style lang="scss" scoped>
.infos {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #333;
  color: #fff;
}

.infos-inner {
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}

.infos__player {
  display: flex;
}

.infos__player__avatar-outer {
  position: relative;
  width: 50px;

  &::before {
    content: '';
    display: block;
    width: 100%;
    padding-top: (1 / 1) * 100%;
  }
}

.infos__player__avatar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.infos__player__name {
  margin-left: 10px;
}

.infos__game {
  display: flex;
  font-size: 16px;
  line-height: 1.2em;
}

.infos__game__picture-outer {
  width: 160px;
}

.infos__game__picture {
  width: 100%;
}

.infos__game-inner {
  margin-left: 20px;
}

.infos__game__spent {
  margin-top: 5px;
}

.infos__game__entries {
  margin-top: 10px;
}

.infos__game__progress {
  width: 100%;
  margin-top: 20px;
  font-size: 13px;
  line-height: 1.2em;
}

.infos__game__progress__bar {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 10px;
  background-color: #fff;
  border-radius: 5px;
}

.infos__game__progress__bar__fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: black;
}

.infos__game__progress__value {
  margin-top: 3px;
}

.infos__timer {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
