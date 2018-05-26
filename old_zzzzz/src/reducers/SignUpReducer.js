import {
    SET_REG_COUNTRY,
    SET_REG_USERNAME,
    SET_REG_EMAIL,
    SET_REG_PHONE_UUID,
    SET_REG_VENUES,
    SET_REG_PRIVACY_OPTIONS,
    SET_REG_PICTURE,
    SET_REG_PASSWORD,
    SET_REG_NAME

} from "../actions/types";

const INITIAL_STATE = {
    username : 'xxxxxx',
    phoneUUID : '',
    phoneCode : '',
    picture : '',
    password : 'Dallas1234',
    name :{
        title : '',
        name: 'My name'
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
    email : 'xxxx@edeee.com',
    privacyOptions : [],
    tos : '',
    customData : {}

}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_REG_COUNTRY:return {...state, address: { ...state.address, country: action.payload}}
        case SET_REG_USERNAME:return {...state, username: action.payload}
        case SET_REG_PHONE_UUID:return {...state, phoneUUID: action.payload}
        case SET_REG_EMAIL:return {...state, email: action.payload}
        case SET_REG_NAME:return {...state, name : { ...state.name, name : action.payload}}
        case SET_REG_PASSWORD:return {...state, password: action.payload}
        case SET_REG_VENUES:return {...state, venues: action.payload}
        case SET_REG_PRIVACY_OPTIONS: {return {...state, privacyOptions: action.payload}}
        case SET_REG_PICTURE:return {...state, picture: action.payload}
    }
    return state;
}