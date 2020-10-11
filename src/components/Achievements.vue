<template>
  <div class="achievements">
    <section
      class="achievements__section"
      v-for="(list, index) in lists"
      :key="`list-${index}`"
    >
      <h1>{{ list.name }}: {{ list.arr.value.length }}</h1>
      <ul class="achievements__list">
        <li
          class="achievements__item"
          v-for="achievement in list.arr.value"
          :key="`achievement-${achievement.name}`"
        >
          <Achievement
            class="achievements__item-inner"
            :achievement="achievement"
          />
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Achievement from '@/components/Achievement.vue'
import { achievements, next, todo, done } from '@/store/achievements.ts'

export default defineComponent({
  name: 'Achievements',
  components: {
    Achievement,
  },
  setup() {
    const lists = [
      { name: 'Next', arr: next },
      { name: 'Todo', arr: todo },
      { name: 'Done', arr: done },
    ]

    return {
      achievements,
      lists,
      done,
      next,
      todo,
    }
  },
})
</script>

<style lang="scss" scoped>
.achievements__section {
  padding: 20px;
  background-color: #fff;

  &:nth-child(even) {
    background-color: #ddd;
  }
}

.achievements__list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
}

.achievements__item {
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

.achievements__item-inner {
  height: 100%;
}
</style>
