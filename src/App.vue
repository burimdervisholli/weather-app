<script setup lang="ts">
import { computed } from 'vue'
import { useWeatherStore } from '@/stores/useWeatherStore'
import SearchLocation from '@/components/SearchLocation.vue'
import Weather from '@/components/Weather.vue'
import Forecast from '@/components/Forecast.vue'
import Placeholder from '@/components/Placeholder.vue'

const weatherStore = useWeatherStore()

const weather = computed(() => weatherStore.weather ?? null)
const loading = computed(() => weatherStore.loadingForecast || weatherStore.loadingWeather)
</script>

<template>
  <div class="weather-page">
    <div class="container">
      <div class="main">
        <SearchLocation />

        <Placeholder v-if="!weather" />
        <template v-else>
          <Weather />
          <Forecast />
        </template>
      </div>
    </div>
    <div v-if="loading" class="loading-overlay">
      <q-spinner color="white" size="50px" />
    </div>
  </div>
</template>

<style lang="scss">
.weather-page {
  background: linear-gradient(180deg, #0289ff 0%, #00d8fe 100%);
  min-height: 100vh;
  padding: 40px 16px;
}

.container {
  max-width: 800px;
  margin: auto;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
