<template>
  <div class="achievements">
    <ul class="achievements">
      <li
        class="achievement"
        :class="{
          'is-unlocked': isUnlocked(a.name),
          'is-target': isTarget(a.name),
        }"
        v-for="(a, index) in total"
        :key="`achievement-${a.name}`"
        :data-id="index"
      >
        <div class="achievement__picture-outer">
          <img class="achievement__picture" :src="a.icon" alt="" />
        </div>

        <div class="achievement-inner">
          <div class="achievement__name">
            {{ a.displayName }}
          </div>
          <div class="achievement__description">
            {{ a.description }}
          </div>
          <a
            class="achievement__help"
            :href="`https://google.com/search?q=${name} ${a.displayName}`"
            target="_blank"
          >
            H
          </a>
          <div class="achievement__target" @click="target(a)">
            T
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.achievements {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
}

.achievement {
  position: relative;
  display: flex;
  align-items: flex-start;
  width: calc(100% / 1 + 1px);
  min-height: 75px;
  flex-shrink: 0;
  margin-top: -1px;
  margin-left: -1px;
  padding: 10px 55px 10px 10px;
  background-color: #fff;
  border: 1px solid black;

  @media screen and (min-width: 600px) {
    width: calc(100% / 2 + 1px);
  }

  @media screen and (min-width: 860px) {
    width: calc(100% / 3 + 1px);
  }

  @media screen and (min-width: 1280px) {
    width: calc(100% / 4 + 1px);
  }

  @media screen and (min-width: 1650px) {
    width: calc(100% / 5 + 1px);
  }

  @media screen and (min-width: 1920px) {
    width: calc(100% / 6 + 1px);
  }

  @media screen and (min-width: 2480px) {
    width: calc(100% / 7 + 1px);
  }

  &.is-target {
    background-color: #fcffd5;
    border: 1px solid #939f00;
    z-index: 2;
  }
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

.achievement__target {
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

export default defineComponent({
  name: 'Achievements',
  props: {
    player: Array,
    total: Array,
    name: String,
  },
  setup(props) {
    const isUnlocked = (name: string) => {
      const pA = props.player as string[]

      return pA.indexOf(name) >= 0
    }

    const isTarget = (name: string) => {
      const lsTargets = localStorage.getItem('targets')

      if (!lsTargets) {
        return
      }

      const targets = JSON.parse(lsTargets)

      return targets.indexOf(name) >= 0
    }

    const target = achievement => {
      const lsTargets = localStorage.getItem('targets')

      if (!lsTargets) {
        localStorage.setItem('targets', JSON.stringify([achievement.name]))

        return
      }

      const arr = JSON.parse(lsTargets as string)
      const index = arr.indexOf(achievement.name)

      index > -1 ? arr.splice(index, 1) : arr.push(achievement.name)

      localStorage.setItem('targets', JSON.stringify(arr))
    }

    return {
      isTarget,
      isUnlocked,
      target,
    }
  },
})
</script>
