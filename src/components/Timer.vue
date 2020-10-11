<template>
  <div class="timer">
    {{ time }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { timer } from '@/store/timer.ts'

export default defineComponent({
  name: 'Timer',
  setup() {
    const time = computed(() => {
      const v = timer.value
      const t = Number(v.time)
      return `${Math.floor(t / 60)}min ${t % 60}s`
    })

    return {
      timer,
      time,
    }
  },
})
</script>
