import { create } from 'apisauce'
import { BACKEND } from '../config/backend'

const api = create({
  baseURL: 'http://192.168.1.47:4600'
})

export const getReady = async () => {
  return api.get(BACKEND.endpoints.registration.getReady)
}
