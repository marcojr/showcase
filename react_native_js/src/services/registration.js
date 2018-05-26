import { create } from 'apisauce'
import { BACKEND } from '../config/backend'

const api = create({
  baseURL: BACKEND.servers[BACKEND.servers['use']]
})

export const GetReady = async () => {
  return api.get(BACKEND.endpoints.registration.getReady)
}
