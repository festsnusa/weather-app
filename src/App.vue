<template lang="pug">
.container
  header.header 
    h1 WEATHER APP
    p 
      | This little, tiny, cutsy project is dedicated to fetch data from 
      a(href="https://openweathermap.org/api/" target="_blank") OpenWeather API
      |. Start fetching data by typing your city name. Enjoy!
  main.main
    .main__header 
      a-input-search.search(v-model:value="city" placeholder="Enter your city name..." style="width: 200px" @search="search")
    .forecast(v-if="objectLoaded")
      .forecast__header
        .forecast__temperature
          span {{ locationData.mainInfo.temp }} &degC
        .forecast__feelsLike 
          span Feels like: {{ locationData.mainInfo.feels_like }}&degC
        .forecast__humidity 
          span Humidity: {{ locationData.mainInfo.humidity}}
        .forecast__pressure 
          span Pressure: {{ locationData.mainInfo.pressure}}
        span.current-date {{ new Date().toLocaleString('en-US', options) }}
        span.city {{locationData.name}}
        .forecast__country-info
          span Country: {{locationData.country}}
          span Population: {{locationData.population.toLocaleString()}}
      .list
        .item(v-for="(item, index) in forecastDates")
          .item__header(@click="item.isActive = !item.isActive")
            a-space.icon(:class="{ iconActive: item.isActive }")
              RightOutlined
            span.item__date {{ setDay(item.date) }}
          .item__content(:class="{item__content_active: item.isActive}")
            ToggleListItem(v-for="value in item.data" :value="value" :isActive="item.isActive")

    .forecast(v-else)
      .forecast__header
        span No data.
  AppFooter
</template>

<script>
import ToggleListItem from '@/components/ToggleListItem.vue'
import AppFooter from '@/components/AppFooter.vue'

import { RightOutlined } from '@ant-design/icons-vue';

export default {
  name: "App",
  components: {
    ToggleListItem,
    AppFooter,
    RightOutlined,
  },
  data() {
    return {
      city: '',
      appKey: 'YOUR API KEY',
      locationData: {},
      objectLoaded: false,
      options: {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      },
      forecastDates: [],
      isActive: false,
    }
  },
  methods: {
    setDay(dateStr) {
      if (this.isCurrentDay(dateStr, new Date())) {
        return "Today"
      }

      if (this.isTomorrow(dateStr)) {
        return "Tomorrow"
      }

      return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })

    },
    isCurrentDay(inputString, currentDate) {

      const inputDate = new Date(inputString)

      // Get the date from the input string
      const inputDay = inputDate.getDate()
      const inputMonth = inputDate.getMonth()
      const inputYear = inputDate.getFullYear()

      // Get the current date
      const currentDay = currentDate.getDate()
      const currentMonth = currentDate.getMonth()
      const currentYear = currentDate.getFullYear()

      // Compare the dates
      const dateIsCurrent = currentDay === inputDay && currentMonth === inputMonth && currentYear === inputYear
      return dateIsCurrent

    },
    isTomorrow(date) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)

      // 👇️ Tomorrow's date
      console.log(tomorrow)

      if (new Date(tomorrow).toISOString().slice(0, 10) === date) {
        return true
      }

      return false
    },
    createArrs(forecastData) {

      // Iterate over the forecast data array
      forecastData.forEach(item => {

        // Extract the date from dt_txt
        const date = item.dt_txt.split(" ")[0]

        // Find the index of the existing date entry, if any
        const existingDateIndex = this.forecastDates.findIndex(entry => entry.date === date)

        // If the date entry doesn't exist, create a new one
        if (existingDateIndex === -1) {
          this.forecastDates.push({
            date,
            data: [item],
            isActive: false,
          });
        }
        else {
          // If the date entry exists, append the item to its data array
          this.forecastDates[existingDateIndex].data.push(item);
        }

        this.forecastDates.push()
      });

    },
    search() {

      this.objectLoaded = false
      this.forecastDates = []
      this.locationData = {}

      if (this.city === "") {
        this.objectLoaded = false
        return
      }

      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(this.city)}&units=metric&APPID=${this.appKey}`)
        .then(response => response.json())
        .then(data => {
          this.locationData = {
            id: data.city.id,
            name: data.city.name,
            country: data.city.country,
            population: data.city.population,
            mainInfo: data.list[0].main,
          };

          this.createArrs(data.list)

          this.objectLoaded = true
        })
        .catch(error => {
          console.error('Error:', error);
          this.objectLoaded = false
          this.forecastDates = []
          this.locationData = {}
        })


    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  padding: 5rem;
}

.main {
  padding-top: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 25rem;

  &__header {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }
}

.current-date {
  font-size: 1.2rem;
  padding: 1.5rem;
}

.forecast {
  display: flex;
  flex-direction: column;

  &__header {
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  &__country-info {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
  }

  &__temperature {
    font-size: 3rem;
  }
}

.city {
  font-size: 3.75rem;
}

.item {
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid rgb(66, 66, 66);
  padding: 1rem;

  &__header {
    display: flex;
    gap: 1rem;
    cursor: pointer;
  }

  &__content {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;


    &_active {
      padding: 1rem;
    }
  }

}

.iconActive {
  transform: rotate(90deg);
  transition: all 0.2s ease-in;
}
</style>