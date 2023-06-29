<template lang="pug">
.info(:class="{ active: isActive }" :value="value")
  span.time {{ setTime }}
  span.feels-like Feels like: {{ value.main.feels_like }}
  span.humidity Humidity: {{ value.main.humidity }}
  span.temp Temperature: {{ value.main.temp }}
  span.temp_min Min Temperature: {{ value.main.temp_min }}
  span.temp_max Max Temperature: {{ value.main.temp_max }}
  span.visibility {{ value.main.visibility }}
  .status(v-if="value.weather.length")
    span.current-status {{ value.weather[0].description }}
    img(:class="`icon__${value.weather[0].icon}`")
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
  display: block;
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
</style>