import { ref } from 'vue'

export const key = ref<string | null>(null)
export const appid = ref<string | null>(null)
export const steamid = ref<string | null>(null)

export const get = () => {
  key.value = localStorage.getItem('key')
  appid.value = localStorage.getItem('appid')
  steamid.value = localStorage.getItem('steamid')
}

export const set = (k: string, v: string | null) => {
  if (!v) {
    return
  }

  if (k === 'key') {
    key.value = v
  }

  if (k === 'appid') {
    appid.value = v
  }

  if (k === 'steamid') {
    steamid.value = v
  }

  localStorage.setItem(k, v)
}
