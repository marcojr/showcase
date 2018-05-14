import {SET_APP_DATA, SET_APP_FONT_LOADED} from "../actions/types";

const INITIAL_STATE = {
    fontLoaded: false,
    countries: loadCountries()
}

export default (state = INITIAL_STATE, action) => {
    console.log('action', action);
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

function loadCountries() {
    return [
        {
            iso: 'GB',
            name: 'United Kingdom',
            areaCode: 44
        },
        {
            iso: 'BR',
            name: 'Brazil',
            areaCode: 55
        }
    ]

}