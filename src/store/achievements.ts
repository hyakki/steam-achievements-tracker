import { ref, watch } from 'vue'

interface GenericObject {
  [key: string]: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

const achievements = ref({
  total: [] as GenericObject[],
  completed: [] as string[],
  percent: 0,
  formated: [],
  marked: [] as string[],
  done: [] as GenericObject[],
  todo: [] as GenericObject[],
  next: [] as GenericObject[],
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

watch(
  () => [achievements.value.total, achievements.value.completed],
  () => {
    const { total, completed } = achievements.value

    achievements.value.percent =
      Math.round((total.length / completed.length) * 10) / 10
  }
)

watch(
  () => [achievements.value.total, achievements.value.marked],
  () => {
    const { total, completed, marked } = achievements.value

    achievements.value.next = total.filter(a => {
      return marked.indexOf(a.name) >= 0
    })
    achievements.value.todo = total.filter(a => {
      return completed.indexOf(a.name) < 0 && marked.indexOf(a.name) < 0
    })
    achievements.value.done = total.filter(a => {
      return completed.indexOf(a.name) >= 0 && marked.indexOf(a.name) < 0
    })
  }
)

export { achievements, mark }
