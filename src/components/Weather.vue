<script setup lang="ts">
import { computed } from 'vue'
import { useWeatherStore } from '@/stores/useWeatherStore'

const weatherStore = useWeatherStore()

const temperature = computed(() => {
  if (
    !weatherStore.weather ||
    !weatherStore.weather.main ||
    typeof weatherStore.weather.main.temp !== 'number'
  ) {
    return 'N/A'
  }
  return weatherStore.weather.main.temp.toFixed(1)
})
const minTemperature = computed(() => {
  if (
    !weatherStore.weather ||
    !weatherStore.weather.main ||
    typeof weatherStore.weather.main.temp_min !== 'number'
  ) {
    return 'N/A'
  }
  return weatherStore.weather.main.temp_min.toFixed(1)
})
const maxTemperature = computed(() => {
  if (
    !weatherStore.weather ||
    !weatherStore.weather.main ||
    typeof weatherStore.weather.main.temp_max !== 'number'
  ) {
    return 'N/A'
  }
  return weatherStore.weather.main.temp_max.toFixed(1)
})
const windSpeed = computed(() => {
  if (
    !weatherStore.weather ||
    !weatherStore.weather.wind ||
    typeof weatherStore.weather.wind.speed !== 'number'
  ) {
    return 'N/A'
  }
  return (weatherStore.weather.wind.speed * 3.6).toFixed(1) // Convert m/s to km/h
})
const humidity = computed(() => {
  if (
    !weatherStore.weather ||
    !weatherStore.weather.main ||
    typeof weatherStore.weather.main.humidity !== 'number'
  ) {
    return 'N/A'
  }
  return weatherStore.weather.main.humidity
})
const feelsLike = computed(() => {
  if (
    !weatherStore.weather ||
    !weatherStore.weather.main ||
    typeof weatherStore.weather.main.feels_like !== 'number'
  ) {
    return 'N/A'
  }
  return weatherStore.weather.main.feels_like.toFixed(1)
})
</script>

<template>
  <q-card class="card q-mb-lg">
    <!-- <pre>{{ data }}</pre> -->

    <q-card-section class="row items-center justify-between">
      <div class="row items-center gap-12">
        <img :src="weatherStore.icon(weatherStore.weather?.weather ?? [])" alt="Weather Icon" />
        <div>
          <div class="text-h5">{{ weatherStore.q }}</div>
          <div class="text-grey-7">Today</div>
        </div>
      </div>

      <div>
        <div class="text-h3">{{ temperature }} {{ weatherStore.unit.temp }}</div>
        <div class="text-sm text-grey-7">
          Min: {{ minTemperature }} / Max: {{ maxTemperature }} {{ weatherStore.unit.temp }}
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="row justify-around text-center">
      <div>
        <q-icon name="air" size="24px" />
        <div>Wind</div>
        <div>{{ windSpeed }} {{ weatherStore.unit.speed }}</div>
      </div>

      <div>
        <q-icon name="water_drop" size="24px" />
        <div>Humidity</div>
        <div>{{ humidity }}%</div>
      </div>

      <div>
        <q-icon name="device_thermostat" size="24px" />
        <div>Feels like</div>
        <div>{{ feelsLike }} {{ weatherStore.unit.temp }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>
