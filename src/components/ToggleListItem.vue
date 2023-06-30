<template lang="pug">
.info(:class="{ active: isActive, iconTransform: isActive }" :value="value")
  span.time {{ setTime }}
  .status(v-if="value.weather.length")
    img(:class="`icon__${value.weather[0].icon}`")
  span.temp {{ value.main.temp }}&degC

  .wind(v-if="value.wind.length")
    span.wind-speed {{ value.wind.speed }}
</template>

<script>
export default {
  name: "ToggleListItem",
  props: ["value", "isActive"],
  computed: {
    setTime() {
      const dateObj = new Date(this.value.dt_txt)
      const hours = dateObj.getHours()
      const minutes = dateObj.getMinutes()

      const formattedHours = hours.toLocaleString(undefined, { minimumIntegerDigits: 2 })
      const formattedMinutes = minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })

      return `${formattedHours}:${formattedMinutes}`
    }
  },
  created() {
    console.log(this.value)
  }
}
</script>

<style lang="scss" scoped>
.info {
  display: none;
}

.active {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid;
  border-radius: 20px;
  padding: 1rem;
}

.iconTransform {
  .icon {
    transform: rotate(90deg);
  }
}

.time {
  text-align: center;
  font-size: 3.5rem;
}

.icon {

  @for $i from 1 through 10 {

    @if ($i < 10) {
      &__0#{$i}d {
        content: url(https://openweathermap.org/img/wn/0#{$i}d@2x.png);
      }

      &__0#{$i}n {
        content: url(https://openweathermap.org/img/wn/0#{$i}n@2x.png);
      }
    }

    @else {
      &__#{$i}d {
        content: url(https://openweathermap.org/img/wn/#{$i}d@2x.png);
      }

      &__#{$i}n {
        content: url(https://openweathermap.org/img/wn/#{$i}n@2x.png);
      }
    }


  }
}

.temp {
  font-size: 2rem;
}
</style>