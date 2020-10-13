<template>
  <router-view />
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import * as settings from '@/store/settings'

export default defineComponent({
  name: 'App',
  setup() {
    onMounted(() => {
      settings.get()
    })
  },
})
</script>
