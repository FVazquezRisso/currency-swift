import axios from 'axios'

export const api = axios.create({
  baseURL:
    `https://openexchangerates.org/api/latest.json?app_id=${import.meta.env.VITE_APP_ID}`,
});