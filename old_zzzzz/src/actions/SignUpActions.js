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
} from "./types";


export const setUsername = (txt) => {
    return {
        type: SET_REG_USERNAME,
        payload: txt
    }
}
export const setEmail = (txt) => {
    return {
        type: SET_REG_EMAIL,
        payload: txt
    }
}
export const setPassword = (txt) => {
    return {
        type: SET_REG_PASSWORD,
        payload: txt
    }
}
export const setName = (txt) => {
    return {
        type: SET_REG_NAME,
        payload: txt
    }
}
export const setCountry = (countryObj) => {

    return {
        type: SET_REG_COUNTRY,
        payload: countryObj
    }
}
export const setPicture = (txt) => {
    return {
        type: SET_REG_PICTURE,
        payload: txt
    }
}
export const setPhoneUUID = (txt) => {
    return {
        type: SET_REG_PHONE_UUID,
        payload: txt
    }
}
export const setTos = (txt) => {
    return {
        type: SET_REG_TOS,
        payload: txt
    }
}
export const setVenues = (arrayVenues) => {
    return {
        type: SET_REG_VENUES,
        payload: arrayVenues
    }
}
export const setPrivacyOptions = (arrayPrivacy) => {
    return {
        type: SET_REG_PRIVACY_OPTIONS,
        payload: arrayPrivacy
    }
}