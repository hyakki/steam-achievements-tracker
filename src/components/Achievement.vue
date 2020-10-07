<template>
  <div class="achievement" v-if="achievement">
    <div class="achievement__picture-outer">
      <img
        class="achievement__picture"
        :src="achievement.icon"
        :alt="`${achievement.displayName} icon`"
      />
    </div>

    <div class="achievement-inner">
      <div class="achievement__name">
        {{ achievement.displayName }}
      </div>
      <div class="achievement__description">
        {{ achievement.description }}
      </div>
      <a
        class="achievement__help"
        :href="getHelpUrl(game.name, achievement.displayName)"
        target="_blank"
      >
        H
      </a>
      <div class="achievement__mark" @click="markAchievement">M</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.achievement {
  position: relative;
  display: flex;
  align-items: flex-start;
  min-height: 75px;
  flex-shrink: 0;
  padding: 10px 55px 10px 10px;
  background-color: #fff;
  border: 1px solid black;
}

.achievement__picture-outer {
  position: relative;
  width: 40px;
  flex-shrink: 0;
  margin-right: 20px;

  .achievement.is-unlocked & {
    opacity: 0.2;
  }

  &::before {
    content: '';
    display: block;
    width: 100%;
    padding-top: (1 / 1) * 100%;
  }
}

.achievement__picture {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.achievement-inner {
  flex-grow: 1;
}

.achievement__name {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2em;
}

.achievement__description {
  margin-top: 5px;
  color: #666;
  font-size: 14px;
  line-height: 1.2em;
}

.achievement__help {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background-color: #ccc;
  font-size: 13px;
  text-decoration: none;
  color: black;
}

.achievement__mark {
  position: absolute;
  top: 40px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background-color: #ccc;
  font-size: 13px;
  text-decoration: none;
  color: black;
  cursor: pointer;

  .achievement.is-unlocked & {
    cursor: default;
    pointer-events: none;
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import { game } from '@/store/game.ts'
import { mark } from '@/store/achievements.ts'

export default defineComponent({
  name: 'Achievement',
  props: {
    achievement: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const getHelpUrl = (gameName, achievementName) => {
      return `https://google.com/search?q=${gameName} ${achievementName}`
    }

    const markAchievement = () => {
      mark(props.achievement.name)
    }

    return {
      getHelpUrl,
      game,
      markAchievement,
    }
  },
})
</script>
