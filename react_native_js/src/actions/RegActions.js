import {
  SET_REG_NAME,
  SET_REG_PASSWORD,
  SET_REG_PICTURE,
  SET_REG_VENUES,
  SET_REG_EMAIL,
  SET_REG_USERNAME,
  SET_REG_COUNTRY,
  SET_REG_PHONE_UUID,
  SET_REG_PRIVACY_OPTIONS,
  SET_REG_TOS
} from './types'

export const setRegUsername = (txt) => {
  return {
    type: SET_REG_USERNAME,
    payload: txt
  }
}
export const setRegEmail = (txt) => {
  return {
    type: SET_REG_EMAIL,
    payload: txt
  }
}
export const setRegPassword = (txt) => {
  return {
    type: SET_REG_PASSWORD,
    payload: txt
  }
}
export const setRegName = (txt) => {
  return {
    type: SET_REG_NAME,
    payload: txt
  }
}
export const setRegCountry = (countryObj) => {
  return {
    type: SET_REG_COUNTRY,
    payload: countryObj
  }
}
export const setRegPicture = (txt) => {
  return {
    type: SET_REG_PICTURE,
    payload: txt
  }
}
export const setRegPhoneUUID = (txt) => {
  return {
    type: SET_REG_PHONE_UUID,
    payload: txt
  }
}
export const setRegTos = (txt) => {
  return {
    type: SET_REG_TOS,
    payload: txt
  }
}
export const setRegVenues = (arrayVenues) => {
  return {
    type: SET_REG_VENUES,
    payload: arrayVenues
  }
}
export const setRegPrivacyOptions = (arrayPrivacy) => {
  return {
    type: SET_REG_PRIVACY_OPTIONS,
    payload: arrayPrivacy
  }
}
