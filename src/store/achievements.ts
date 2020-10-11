import { ref, computed } from 'vue'

const achievements = ref({
  total: [] as Record<string, string>[],
  completed: [] as string[],
  formated: [],
  marked: [] as string[],
})

const mark = (name: string) => {
  const { marked } = achievements.value

  if (marked.indexOf(name) >= 0) {
    achievements.value.marked = achievements.value.marked.filter(
      a => a !== name
    )
  } else {
    achievements.value.marked = [name].concat(achievements.value.marked)
  }
}

const next = computed(() => {
  return achievements.value.total.filter(
    a => achievements.value.marked.indexOf(a.name) >= 0
  )
})

const todo = computed(() => {
  return achievements.value.total.filter(
    a =>
      achievements.value.completed.indexOf(a.name) < 0 &&
      achievements.value.marked.indexOf(a.name) < 0
  )
})

const done = computed(() => {
  const { total, completed, marked } = achievements.value

  return total.filter(
    a => completed.indexOf(a.name) >= 0 && marked.indexOf(a.name) < 0
  )
})

const percent = computed(() => {
  const { completed, total } = achievements.value

  if (completed.length === 0) {
    return 0
  }

  return Math.round((completed.length / total.length) * 1000) / 10
})

export { achievements, mark, percent, next, todo, done }
