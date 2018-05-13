import React from 'react';
import { View, Text, Button} from 'react-native';
import {connect} from 'react-redux';
import { StepProgress } from '../../components';

import style from './style';
class signUp extends React.Component {
    render() {
        return(
            <View style={style.page}>
               <View style={style.form}>

               </View>
                <View style={style.progress}>
                    <StepProgress />
                    <View style={style.stepDescriptionContainer}>
                        <Text style={style.stepDescriptionText}>{this.props.stepDescription}</Text>
                    </View>
                </View>
                <View style={style.footer}>
                    <Button color="#68d6f9"
                            style={ style.button }
                            title={this.props.buttonText}
                            onPress={() => false}/>
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => (
    {
        step: state.SignUpReducer.step,
        stepDescription : state.SignUpReducer.stepDescription,
        buttonText : state.SignUpReducer.buttonText,
        totalSteps: state.SignUpReducer.totalSteps,
        country: state.SignUpReducer.country,
        mobileNumber: state.SignUpReducer.mobileNumber,
        email: state.SignUpReducer.email,
        username: state.SignUpReducer.username,
        confirmationCode: state.SignUpReducer.confirmationCode,
        resendTimeOut: state.SignUpReducer.resendTimeOut,
        name: state.SignUpReducer.name,
        password: state.SignUpReducer.password,
        passwordConfirmation: state.SignUpReducer.passwordConfirmation,
        picture: state.SignUpReducer.picture,
        venues: state.SignUpReducer.venues,
        privacy: state.SignUpReducer.privacy,
        errorMessage: state.SignUpReducer.errorMessage
    }
);

export default connect(mapStateToProps, {})(signUp);