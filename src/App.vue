<template lang="pug">
input(type="search" @keyup.enter="search" v-model="city" placeholder="Enter your city name...")
.forecast(v-if="objectLoaded")
  span {{ new Date().toLocaleString('en-US', options) }}
  span City: {{locationData.name}}
  span Country: {{locationData.country}}
  span Population: {{locationData.population}}
  .list
    .item(v-for="(item, index) in forecastDates") 
      .item__header(@click="item.isActive = !item.isActive")
        span.item__date {{ item.date }}
      ToggleListItem(v-for="value in item.data" :value="value" :isActive="item.isActive")

.forecast(v-else)
  span No data.
</template>

<script>
import ToggleListItem from '@/components/ToggleListItem.vue'

export default {
  name: "App",
  components: {
    ToggleListItem
  },
  data() {
    return {
      city: '',
      appKey: 'db37d5bd89a260ab941a4874ace7032d',
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

      console.log(dateIsCurrent)
      return dateIsCurrent

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

      console.log(this.forecastDates);

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
          console.log(data)
          this.locationData = {
            id: data.city.id,
            name: data.city.name,
            country: data.city.country,
            population: data.city.population,
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
.forecast {
  display: flex;
  flex-direction: column;
}

.item {
  display: flex;
  flex-direction: column;
}
</style>