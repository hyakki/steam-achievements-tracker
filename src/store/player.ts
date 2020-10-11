import { ref } from 'vue'

const player = ref({
  name: null,
  avatar: null,
  game: null,
  hours: null,
  owned: [],
})

export { player }
