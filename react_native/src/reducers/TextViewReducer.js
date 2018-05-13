import { SET_TEXT_VIEW} from "../actions/types";

const INITIAL_STATE = {
    title: '',
    text: '',
    showButton: false,
    buttonTitle : ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_TEXT_VIEW:return {...state,
            title: action.payload.title,
            text: action.payload.text,
            showButton: action.payload.showButton,
            buttonTitle : action.payload.buttonTitle
        }
    }
    return state;
}