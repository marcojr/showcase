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
    username : '',
    phoneUUID : '',
    phoneCode : '',
    picture : '',
    password : '',
    name :{
        title : '',
        name: ''
    },
    birthDay: '',
    bio : '',
    gender : '',
    address : {
        streetLine1 : '',
        streetLine2 : '',
        city : '',
        stateOrCounty : '',
        postCode : '',
        latitude : '',
        longitude : '',
        country : {
            iso: '',
            name: '',
            areaCode : ''
        }
    },
    venues: [],
    email : '',
    privacyOptions : [],
    tos : '',
    customData : {}

}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_REG_COUNTRY:return {...state, address: { ...state.address, country: action.payload}}
        case SET_REG_USERNAME:return {...state, username: action.payload}
        case SET_REG_MOBILE_NUMBER:return {...state, mobileNumber: action.payload}
        case SET_REG_EMAIL:return {...state, email: action.payload}
        case SET_REG_NAME:return {...state, name : { ...state.name, name : action.payload}}
        case SET_REG_PASSWORD:return {...state, password: action.payload}
        case SET_REG_VENUES:return {...state, venues: action.payload}
        case SET_REG_PRIVACY:return {...state, privacy: action.payload}
        case SET_REG_PICTURE:return {...state, picture: action.payload}
    }
    return state;
}