import { SET_APP_DATA, SET_APP_USER } from "./types";

export const setAppData = (allParameters) => {
    return {
        type: SET_APP_DATA,
        payload: allParameters
    }
}
export const setAppUser = (allParameters) => {
    return {
        type: SET_APP_USER,
        payload: allParameters
    }
}