import {SET_APP_DATA, SET_APP_FONT_LOADED} from "../actions/types";

const INITIAL_STATE = {
    fontLoaded: false,
    countries: [],
    venues: [],
    privacyOptions: [],
    texts : null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_APP_DATA:
            return {
                ...state,
                countries: action.payload.countries,
                texts: action.payload.texts,
                venues: action.payload.venues,
                privacyOptions: action.payload.privacyOptions
            }
        case SET_APP_FONT_LOADED:
            return {
                ...state,
                fontLoaded: action.payload
            }

    }
    return state;
}