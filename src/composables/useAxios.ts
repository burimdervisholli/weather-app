import axios, { type AxiosInstance } from 'axios'

export function useAxios(): AxiosInstance {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://api.openweathermap.org/data/3.0/',
  })

  // Add a request interceptor to include the appId as param before each request
  instance.interceptors.request.use(
    (config) => {
      const appId = import.meta.env.VITE_API_KEY

      if (config.params) {
        config.params.appid = appId
      } else {
        config.params = { appid: appId }
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  return instance
}
