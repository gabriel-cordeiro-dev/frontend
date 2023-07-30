import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://wild-pink-coati-tux.cyclic.app/api',
})
