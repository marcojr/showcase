import { Actions } from 'react-native-router-flux';
import {    SET_REG_CONFIRMATION_CODE, SET_REG_COUNTRY,
            SET_REG_EMAIL,SET_REG_ERROR_MESSAGE,
            SET_REG_MOBILE_NUMBER,SET_REG_NAME,
            SET_REG_PASSWORD,SET_REG_PASSWORD_CONFIRMATION,
            SET_REG_PICTURE, SET_REG_PRIVACY,
            SET_REG_RESEND_TIMEOUT,SET_REG_STEP,
            SET_REG_USERNAME, SET_REG_VENUES,
            SET_REG_SHOW_PICKER} from "./types";

export const setUsername = (txt) => {
    return {
        type: SET_REG_USERNAME,
        payload: txt
    }
}
export const setMobileNumber = (txt) => {
    return {
        type: SET_REG_MOBILE_NUMBER,
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
export const setPasswordConfirmation = (txt) => {
    return {
        type: SET_REG_PASSWORD_CONFIRMATION,
        payload: txt
    }
}
export const setName = (txt) => {
    return {
        type: SET_REG_NAME,
        payload: txt
    }
}
export const setResendTimeOut = (ms) => {
    return {
        type: SET_REG_RESEND_TIMEOUT,
        payload: parseInt(ms)
    }
}
export const setStep = (txt) => {
    return {
        type: SET_REG_STEP,
        payload: txt
    }
}
export const setCode = (txt) => {
    return {
        type: SET_REG_CONFIRMATION_CODE,
        payload: txt
    }
}
export const setShowPicker = (value) => {
    return {
        type: SET_REG_SHOW_PICKER,
        payload: value
    }
}
export const setCountry = (countryObj) => {
    //alert(JSON.stringify(countryObj));
    return {
        type: SET_REG_COUNTRY,
        payload: countryObj
    }
}