import { SET_COUNTRY} from "../actions/types";

const INITIAL_STATE = {
    step: 0,
    stepDescription : 'First, we need to know some basics about you',
    buttonText : 'Continue',
    totalSteps: 5,
    country: {},
    mobileNumber: '',
    email: '',
    username: '',
    confirmationCode: '',
    resendTimeOut: 60,
    name: '',
    password: '',
    passwordConfirmation: '',
    picture: null,
    venues: [],
    privacy: [],
    errorMessage: ''

}

export default (state = INITIAL_STATE, action) => {
    console.log('action',action);
    switch(action.type) {
        case SET_COUNTRY:return {...state, country: action.payload}
    }
    return state;
}