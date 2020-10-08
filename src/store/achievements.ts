import { ref, computed } from 'vue'

const achievements = ref({
  total: [] as Record<string, string>[],
  completed: [] as string[],
  formated: [],
  marked: [] as string[],
  // percent: 0,
  // next: [] as Record<string, string>[],
  // todo: [] as Record<string, string>[],
  // done: [] as Record<string, string>[],
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

// watch(
//   () => [achievements.value.total, achievements.value.completed],
//   () => {
//     const { total, completed } = achievements.value

//     achievements.value.percent =
//       Math.round((total.length / completed.length) * 10) / 10
//   }
// )

// watch(
//   () => [achievements.value.total, achievements.value.marked],
//   () => {
//     const { total, completed, marked } = achievements.value

//     achievements.value.next = total.filter(a => {
//       return marked.indexOf(a.name) >= 0
//     })
//     achievements.value.todo = total.filter(a => {
//       return completed.indexOf(a.name) < 0 && marked.indexOf(a.name) < 0
//     })
//     achievements.value.done = total.filter(a => {
//       return completed.indexOf(a.name) >= 0 && marked.indexOf(a.name) < 0
//     })
//   }
// )

const next = computed(() => {
  return achievements.value.total.filter(a => {
    return achievements.value.marked.indexOf(a.name) >= 0
  })
})

const todo = computed(() => {
  return achievements.value.total.filter(a => {
    return (
      achievements.value.completed.indexOf(a.name) < 0 &&
      achievements.value.marked.indexOf(a.name) < 0
    )
  })
})

const done = computed(() => {
  return achievements.value.total.filter(a => {
    return (
      achievements.value.completed.indexOf(a.name) >= 0 &&
      achievements.value.marked.indexOf(a.name) < 0
    )
  })
})

const percent = computed(() => {
  if (achievements.value.completed.length === 0) {
    return 0
  }

  return (
    Math.round(
      (achievements.value.total.length / achievements.value.completed.length) *
        10
    ) / 10
  )
})

export { achievements, mark, percent, next, todo, done }
