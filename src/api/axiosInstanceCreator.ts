import axios, { AxiosInstance } from 'axios'

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: '*/*',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
}

export const createAxiosInstance = (): AxiosInstance => {
  const newInstance = axios.create({
    headers,
  })

  newInstance.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      throw error
    }
  )

  newInstance.interceptors.request.use((request: any) => {
    request.headers = {
      ...request.headers,
    }
    return request
  })

  return newInstance
}
