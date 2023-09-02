import axios from 'axios'
import { anilibriaBase } from './baseUrls'

export const axiosInstance = axios.create({
  baseURL: anilibriaBase,
  transformResponse: [(data) => JSON.parse(data)]
})