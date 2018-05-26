import { combineReducers } from 'redux';
import SignUpReducer from './SignUpReducer';
import SignInReducer from './SignInReducer';
import TextViewReducer from './TextViewReducer';
import AppReducer from './AppReducer';

export default combineReducers({
    SignUpReducer,
    SignInReducer,
    TextViewReducer,
    AppReducer
});