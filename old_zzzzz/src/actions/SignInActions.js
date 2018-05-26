import { SET_USERNAME, SET_PASSWORD, SET_MODE } from "./types";

export const setUsername = (txt) => {
    return {
        type: SET_USERNAME,
        payload: txt
    }
}
export const setPassword = (txt) => {
    return {
        type: SET_PASSWORD,
        payload: txt
    }
}
export const setMode = (txt) => {
    return {
        type: SET_MODE,
        payload: txt
    }
}