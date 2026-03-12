<script setup lang="ts">
import { onMounted } from 'vue'
import { useAxios } from '@/composables/useAxios'

const axiosInstance = useAxios()

const apiKey = import.meta.env.VITE_API_KEY

onMounted(async () => {
  try {
    const response = await axiosInstance.get('/weather', {
      params: {
        q: 'Pristina',
        units: 'metric',
      },
    })
    console.log('Weather data:', response.data)
  } catch (error) {
    console.error('Error fetching weather data:', error)
  }
})
</script>

<template>
  <div>
    <QBtn color="primary" label="Hello World" />
    {{ apiKey }}
    <h1>You did it! <q-badge color="secondary"> #4D96F2 </q-badge></h1>
    <p>
      Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
      documentation
    </p>
  </div>
</template>
