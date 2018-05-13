import { combineReducers } from 'redux';
import SignUpReducer from './SignUpReducer';
import SignInReducer from './SignInReducer';
import TextViewReducer from './TextViewReducer';

export default combineReducers({
    SignUpReducer,
    SignInReducer,
    TextViewReducer
});