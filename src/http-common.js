import Vue from 'vue'
import VueCookie from 'vue-cookie'
import axios from 'axios'

export const HTTP = axios.create({
  baseURL: 'https://slide.freel.me/api/v1/',
  headers: {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json'
  }
});

HTTP.interceptors.request.use(
  (config) => {
    let token = VueCookie.get('token_refresh')

    if (token) {
      config.headers['Authorization'] = `Bearer ${ token }`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)
