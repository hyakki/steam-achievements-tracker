<template>
  <div class="settings">
    <form class="settings__form" @submit.prevent="onSubmit" ref="form">
      <select class="settings__form__item" v-model="appid">
        <option value="250900">The Binding of Isaac Rebirth</option>
        <option value="1145360">Hades</option>
      </select>
      <input
        class="settings__form__item"
        type="text"
        placeholder="steamid"
        v-model="steamid"
        required
      />
      <input
        class="settings__form__item"
        type="text"
        placeholder="key"
        v-model="key"
        required
      />
      <button class="settings__form__item" type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Settings',
  setup() {
    const appid = ref(localStorage.getItem('appid'))
    const steamid = ref(localStorage.getItem('steamid'))
    const key = ref(localStorage.getItem('key'))
    const form = ref()

    const onSubmit = () => {
      appid.value && localStorage.setItem('appid', appid.value)
      steamid.value && localStorage.setItem('steamid', steamid.value)
      key.value && localStorage.setItem('key', key.value)
    }

    return {
      appid,
      form,
      key,
      onSubmit,
      steamid,
    }
  },
})
</script>

<style lang="scss" scoped>
.settings {
  position: relative;
  padding: 10px;
  background-color: #292929;
}

.settings__form {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.settings__form__item {
  margin-right: 5px;
}
</style>
