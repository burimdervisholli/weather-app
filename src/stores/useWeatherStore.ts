import { defineStore } from 'pinia'
import { useAxios } from '@/composables/useAxios'

interface WeatherData {
  main?: {
    temp?: number
    temp_min?: number
    temp_max?: number
    humidity?: number
    feels_like?: number
  }
  weather?: { id: number; icon: string }[] | null
  wind?: {
    speed?: number
  }
  dt?: number
}

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    units: 'metric',
    q: '',
    weather: null as WeatherData | null,
    loadingWeather: false,
    forecast: [] as WeatherData[],
    loadingForecast: false,
  }),

  actions: {
    async fetchWeatherData() {
      if (!this.q) return

      this.loadingWeather = true
      try {
        const response = await useAxios().get('/data/2.5/weather', {
          params: {
            q: this.q,
            units: this.units,
          },
        })
        this.weather = response.data
      } catch (error) {
        console.error('Error fetching weather data:', error)
      } finally {
        this.loadingWeather = false
      }
    },

    async fetchForecastData() {
      if (!this.q) return

      this.loadingForecast = true
      try {
        const { data } = await useAxios().get('/data/2.5/forecast', {
          params: {
            q: this.q,
            units: this.units,
          },
        })
        this.forecast = data.list
      } catch (error) {
        console.error('Error fetching forecast data:', error)
      } finally {
        this.loadingForecast = false
      }
    },

    async updateData() {
      await Promise.all([this.fetchWeatherData(), this.fetchForecastData()])
    },
  },

  getters: {
    unit: (state): { temp: string; speed: string } => {
      return {
        temp: state.units === 'metric' ? '°C' : '°F',
        speed: state.units === 'metric' ? 'km/h' : 'mph',
      }
    },
    icon: (state) => {
      return (weather: { icon: string }[] | null) => {
        const icon = weather?.[0]?.icon
        return icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : '01d'
      }
    },
  },
})
