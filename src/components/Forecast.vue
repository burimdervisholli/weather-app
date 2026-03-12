<script setup lang="ts">
import { computed } from 'vue'
import { useWeatherStore } from '@/stores/useWeatherStore'

const weatherStore = useWeatherStore()
const forecast = computed(() => weatherStore.forecast ?? [])

function formatDate(dt: number | undefined) {
  if (!dt) return 'N/A'
  const date = new Date(dt * 1000)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function temprature(temp: number | undefined) {
  if (temp === undefined) return 'N/A'
  return `${temp.toFixed(1)}${weatherStore.unit.temp}`
}
</script>

<template>
  <q-card class="card q-mb-lg">
    <q-card-section>
      <div class="text-h6 q-mb-md">5 Day Forecast</div>

      <div class="forecast-grid">
        <div v-for="item in forecast" :key="`dt-${item.dt}`" type="button" class="forecast-day">
          <div>{{ formatDate(item.dt) }}</div>
          <img :src="weatherStore.icon(item.weather ?? [])" alt="Weather Icon" />
          <div>{{ temprature(item.main?.temp) }}</div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style lang="scss">
.forecast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
}

.forecast-day {
  padding: 12px;
  text-align: center;
  border-radius: 10px;
  transition: all 0.2s;
  border-style: solid;
  border-width: 1px;
  border-color: #ddd;
}
</style>
