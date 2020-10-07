<template>
  <div class="infos">
    <img
      class="infos__avatar"
      :src="avatar"
      width="100"
      height="100"
      alt="Player avatar"
    />
    <div class="infos__name">
      {{ name }}
    </div>
    <div class="infos__game">
      {{ game }}
    </div>
    <div class="infos__hours">
      {{ hours }}
    </div>
    <div class="infos__progress">
      <div class="infos__progress__value">
        {{ achieved }} / {{ total }} ( {{ progressPercent }} )
      </div>
      <div class="infos__progress__bar">
        <div
          class="infos__progress__bar__fill"
          :style="`width: ${progressPercent};`"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.infos {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid black;
  background-color: #333;
  color: #fff;
}

.infos__name {
  margin-top: 5px;
}

.infos__game {
  margin-top: 20px;
}

.infos__hours {
  margin-top: 5px;
}

.infos__progress {
  margin-top: 20px;
}

.infos__progress__bar {
  position: relative;
  overflow: hidden;
  width: 130px;
  height: 10px;
  margin-top: 5px;
  background-color: #fff;
  border-radius: 5px;
}

.infos__progress__bar__fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: black;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Infos',
  props: {
    name: String,
    game: String,
    avatar: String,
    hours: String,
    achieved: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const progressRounded =
      Math.round((props.achieved / props.total) * 100 * 10) / 10
    const progressPercent = `${progressRounded}%`

    return {
      progressPercent,
    }
  },
})
</script>
