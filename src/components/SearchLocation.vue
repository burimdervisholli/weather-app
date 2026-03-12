<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAxios } from '@/composables/useAxios'
import { useWeatherStore } from '@/stores/useWeatherStore'

const axiosInstance = useAxios()
const weatherStore = useWeatherStore()

interface Location {
  label: string
  value: string
}

const options = ref<Location[]>([])

const location = computed({
  get() {
    return weatherStore.q
  },
  set(value: Location) {
    weatherStore.q = value.value
    weatherStore.updateData()
  },
})

const units = computed({
  get() {
    return weatherStore.units
  },
  set(value: string) {
    if (weatherStore.units == value) return
    weatherStore.units = value
    weatherStore.updateData()
  },
})

async function searchOptions(q: string) {
  if (q.length < 2) {
    options.value = []
    return
  }

  try {
    const { data } = await axiosInstance.get('/geo/1.0/direct', {
      params: {
        q,
        limit: 20,
      },
    })
    options.value = data.map((item: Record<string, unknown>) => {
      return {
        label: `${item.name}, ${item.country}`,
        value: item.name,
      }
    })
  } catch (error) {
    console.error('Error fetching location options:', error)
  }
}
</script>

<template>
  <div class="card row items-center justify-between q-mb-lg gap-12">
    <div class="col">
      <q-select
        filled
        v-model="location"
        label="Search Location"
        use-input
        hide-selected
        fill-input
        input-debounce="300"
        :options="options"
        @input-value="searchOptions"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> Search for results... </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <q-btn-group class="q-mx-md">
      <q-btn :outline="units !== 'metric'" color="primary" label="°C" @click="units = 'metric'" />
      <q-btn
        :outline="units !== 'imperial'"
        color="primary"
        label="°F"
        @click="units = 'imperial'"
      />
    </q-btn-group>

    <q-btn outline color="primary" icon="refresh" @click="weatherStore.updateData()" />
  </div>
</template>
