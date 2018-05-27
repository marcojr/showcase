import { create } from 'apisauce'
import { BACKEND } from '../config/backend'

const api = create({
  baseURL: BACKEND.servers[BACKEND.servers['use']]
})

export const GetReady = async () => {
  return api.get(BACKEND.endpoints.registration.getReady)
}
export const CheckAvailability = (endPoint, context, data) => {
    return api.get(BACKEND.endpoints.registration[endPoint] +'?' + context +'=' + data)
}
export const SendSMS = (mobileNumber) => {
    return api.post(BACKEND.endpoints.registration.sendSMS, {mobileNumber})
}
export const ConfirmSMS = (code,mobileNumber) => {
    return api.post(BACKEND.endpoints.registration.confirmSMS, {mobileNumber,code})
}