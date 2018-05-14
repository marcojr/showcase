import { SET_APP_DATA,SET_APP_FONT_LOADED } from "./types";

export const setAppData = (allParameters) => {
    return {
        type: SET_APP_DATA,
        payload: allParameters
    }
}
export const setAppFontLoaded = () => {
    return {
        type: SET_APP_DATA,
        payload: true
    }
}