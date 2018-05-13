import { SET_USERNAME, SET_PASSWORD, SET_MODE} from "../actions/types";

const INITIAL_STATE = {
    username: '',
    password: '',
    mode: 'chooseAction'

}

export default (state = INITIAL_STATE, action) => {
    console.log('action',action);
    switch(action.type) {
        case SET_USERNAME:return {...state, username: action.payload}
        case SET_PASSWORD:return {...state, password: action.payload}
        case SET_MODE:return {...state, mode: action.payload}
    }
    return state;
}