import {
    SET_REG_COUNTRY,
    SET_REG_SHOW_PICKER,
    SET_REG_USERNAME,
    SET_REG_EMAIL,
    SET_REG_MOBILE_NUMBER,
    SET_REG_STEP
} from "../actions/types";

const INITIAL_STATE = {
    step: 3,
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
    }
    return state;
}