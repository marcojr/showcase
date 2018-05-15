import {
    SET_REG_COUNTRY,
    SET_REG_SHOW_PICKER,
    SET_REG_USERNAME,
    SET_REG_EMAIL,
    SET_REG_MOBILE_NUMBER,
    SET_REG_STEP, SET_REG_RESEND_TIMEOUT,
    SET_REG_CONFIRMATION_CODE,
    SET_REG_VENUES,
    SET_REG_PRIVACY,
    SET_REG_PICTURE,
    SET_REG_PASSWORD_CONFIRMATION,
    SET_REG_PASSWORD,
    SET_REG_NAME,
    SET_REG_ERROR_MESSAGE
} from "../actions/types";

const INITIAL_STATE = {
    step: 2,
    buttonText : 'Continue',
    totalSteps: 5,
    country: {},
    mobileNumber: '',
    email: '',
    username: '',
    confirmationCode: '',
    resendTimeOut: 60,
    name: '',
    password: '',
    passwordConfirmation: '',
    picture: null,
    venues: [],
    privacy: [],
    errorMessage: '',
    showPicker: false

}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_REG_COUNTRY:return {...state, country: action.payload}
        case SET_REG_SHOW_PICKER:return {...state, showPicker: action.payload}
        case SET_REG_USERNAME:return {...state, username: action.payload}
        case SET_REG_MOBILE_NUMBER:return {...state, mobileNumber: action.payload}
        case SET_REG_EMAIL:return {...state, email: action.payload}
        case SET_REG_STEP:return {...state, step: action.payload}
        case SET_REG_RESEND_TIMEOUT:return {...state, resendTimeOut: action.payload}
        case SET_REG_NAME:return {...state, name: action.payload}
        case SET_REG_PASSWORD:return {...state, password: action.payload}
        case SET_REG_PASSWORD_CONFIRMATION:return {...state, passwordConfirmation: action.payload}
        case SET_REG_CONFIRMATION_CODE:return {...state, confirmationCode: action.payload}
        case SET_REG_ERROR_MESSAGE:return {...state, errorMessage: action.payload}
        case SET_REG_VENUES:return {...state, venues: action.payload}
        case SET_REG_PRIVACY:return {...state, privacy: action.payload}
        case SET_REG_PICTURE:return {...state, picture: action.payload}
    }
    return state;
}