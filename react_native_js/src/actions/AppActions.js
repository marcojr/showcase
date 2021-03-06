import {
  SET_APP_INITIAL_LOAD,
  SET_APP_USER, SET_APP_SPINNER,
  SET_APP_LOCAL_RND} from './types'

export const setAppInitialLoad = (allParameters) => {
  return {
    type: SET_APP_INITIAL_LOAD,
    payload: allParameters
  }
}
export const setAppSpinner = (allParameters) => {
  return {
    type: SET_APP_SPINNER,
    payload: allParameters
  }
}
export const setAppUser = (allParameters) => {
  return {
    type: SET_APP_USER,
    payload: allParameters
  }
}
export const setAppLocalRnd = (randNumb) => {
  return {
    type: SET_APP_LOCAL_RND,
    payload: randNumb
  }
}
