import {SET_APP_INITIAL_LOAD,
  SET_APP_USER,
  SET_APP_SPINNER, SET_APP_LOCAL_RND} from '../actions/types'

const INITIAL_STATE = {
  countries: [],
  venues: [],
  privacyOptions: [],
  texts: null,
  user: null,
  spinner: {
    visible: false,
    text: ''
  },
  appVersion: 0.1,
  localRnd: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_APP_INITIAL_LOAD:
      return {
        ...state,
        countries: action.payload.countries,
        texts: action.payload.texts,
        venues: action.payload.venues,
        privacyOptions: action.payload.privacyOptions
      }
    case SET_APP_USER:
      return {
        ...state,
        user: action.payload
      }
    case SET_APP_SPINNER:
      return {
        ...state,
        spinner: action.payload
      }
    case SET_APP_LOCAL_RND:
      return {
        ...state,
        localRnd: action.payload
      }
  }
  return state
}
