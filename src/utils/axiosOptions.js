import axios from 'axios'
import { anilibriaBase, userBase } from './baseUrls'

axios.defaults.transformResponse = [(data) => JSON.parse(data)]

export const axiosInstance = axios.create({
  baseURL: anilibriaBase,
})

export const userAxios = axios.create({
  baseURL: userBase,
});
