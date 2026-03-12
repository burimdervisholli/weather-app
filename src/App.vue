<script setup lang="ts">
import { computed } from 'vue'
import { useWeatherStore } from '@/stores/useWeatherStore'
import SearchLocation from '@/components/SearchLocation.vue'
import Weather from '@/components/Weather.vue'
import Forecast from '@/components/Forecast.vue'
import Placeholder from '@/components/Placeholder.vue'

const weatherStore = useWeatherStore()

const weather = computed(() => weatherStore.weather ?? null)
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
</style>
