import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://66c60dea134eb8f434969be4.mockapi.io/api/v1/',
    timeout: 2000,
    headers: {'X-Custom-Header': 'foobar'}
  });

export const instancia2 = axios.create()