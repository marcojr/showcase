import { Actions } from 'react-native-router-flux';
import { SET_TEXT_VIEW } from "./types";

export const setTextView = (allParameters) => {
    return {
        type: SET_TEXT_VIEW,
        payload: allParameters
    }
}