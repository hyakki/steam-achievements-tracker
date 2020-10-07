<template>
  <div class="achievements">
    <h1>Target: {{ achievements.next.length }}</h1>
    <ul class="achievements__list">
      <li
        class="achievement__item"
        v-for="achievement in achievements.next"
        :key="`achievement-${achievement.name}`"
      >
        <Achievement :achievement="achievement" />
      </li>
    </ul>

    <hr />

    <h1>Todo: {{ achievements.todo.length }}</h1>
    <ul class="achievements__list">
      <li
        class="achievement__item"
        v-for="achievement in achievements.todo"
        :key="`achievement-${achievement.name}`"
      >
        <Achievement :achievement="achievement" />
      </li>
    </ul>

    <hr />

    <h1>Done: {{ achievements.done.length }}</h1>
    <ul class="achievements__list">
      <li
        class="achievement__item"
        v-for="achievement in achievements.done"
        :key="`achievement-${achievement.name}`"
      >
        <Achievement :achievement="achievement" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.achievements__list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
}

.achievement__item {
  position: relative;
  width: calc(100% / 1 + 1px);
  margin-top: -1px;
  margin-left: -1px;

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
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import Achievement from '@/components/Achievement.vue'
import { achievements } from '@/store/achievements.ts'

export default defineComponent({
  name: 'Achievements',
  components: {
    Achievement,
  },
  setup() {
    return {
      achievements,
    }
  },
})
</script>
