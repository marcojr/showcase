import {SET_APP_INITIAL_LOAD,
        SET_APP_USER,
        SET_APP_SPINNER} from '../actions/types'

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
    toast: {
        text: '',
        icon: null,
        backgroundColor: '#000',
        fontColor : '#FFF',
        rnd: null
    }
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
    }
    return state
}
