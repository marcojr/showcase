import { SET_COUNTRY} from "../actions/types";

const INITIAL_STATE = {
    country: {},
    mobileNumber: '',
    email: '',
    username: '',

}

export default (state = INITIAL_STATE, action) => {
    console.log('action',action);
    switch(action.type) {
        case SET_COUNTRY:return {...state, country: action.payload}
    }
    return state;
}