import { create } from 'apisauce'
import { BACKEND } from '../config/backend'

const api = create({
  baseURL: BACKEND.servers[BACKEND.servers['use']]
})

export const Login = async (loginParamenters) => {
  return api.post(BACKEND.endpoints.session.login, loginParamenters)
}
export const Logout = async (userUUID) => {
  return api.get(BACKEND.endpoints.session.logout + '/' + userUUID)
}
