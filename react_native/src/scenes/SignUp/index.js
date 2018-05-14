import React from 'react';
import {View, Text, Button, TextInput, Picker, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {StepProgress} from '../../components';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {setCountry, setShowPicker, setStep, setUsername, setEmail, setMobileNumber} from "../../actions/SignUpActions";
import style from './style';

class signUp extends React.Component {
    goNext(){
        this.props.setStep(parseInt(this.props.step) +1);
    }
    showFooterPicker() {
        if (this.props.showPicker) {
            return (
                <View style={style.picker}>
                    <TouchableOpacity onPress={() => this.props.setShowPicker(false)}>
                        <View style={style.closePicker}>
                            <Text>X</Text>
                        </View>
                    </TouchableOpacity>
                    <Picker
                        selectedValue={this.props.country.iso}
                        onValueChange={
                            itemValue => this.props.countryList.map(item => {
                                item.iso == itemValue ? this.props.setCountry(item) : null
                            })
                        }>
                        {this.props.countryList.map((item, index) => {
                            return (<Picker.Item style={{backgroundColor: 'white'}} label={item.name} value={item.iso}
                                                 key={item.iso}/>);
                        })}
                    </Picker>
                </View>
            );
        }
        else {
            return;
        }
    }
    showSelectedCountry() {
        if(this.props.country.iso) {
            return this.props.country.name
        } else {
            return 'Select country';
        }
    }
    render() {
        return (
            <View style={style.page}>
                <View style={style.form}>
                    <View>
                        <TouchableOpacity style={style.formRow} onPress={() => this.props.setShowPicker(true)}>
                            <Text
                                style={
                                    [
                                        style.textInput,
                                        { opacity: this.props.country.iso ? 1 : 0.5}
                                    ]
                                    }>{this.showSelectedCountry()}</Text>
                            <View style={{paddingRight:15}}><Text>?</Text></View>
                        </TouchableOpacity>
                    </View>
                    <View style={style.formRow}>
                        <TextInput
                            style={style.textInput}
                            placeholder="Mobile number (without country code)"
                            onChangeText={value => this.props.setMobileNumber(value)}/>
                    </View>
                    <View style={style.formRow}>
                        <TextInput
                            style={style.textInput}
                            placeholder="Email"
                            onChangeText={value => this.props.setEmail(value)}/>
                    </View>
                    <View style={style.formRow}>
                        <TextInput
                            style={style.textInput}
                            placeholder="Choose an username"
                            onChangeText={value => this.props.setUsername(value)}/>
                    </View>
                </View>
                <View style={style.progress}>
                    <StepProgress/>
                    <View style={style.stepDescriptionContainer}>
                        <Text style={style.stepDescriptionText}>{stepDescs[this.props.step]}</Text>
                    </View>
                </View>
                <View style={style.footer}>
                    {this.showFooterPicker()}
                    <Button color="#68d6f9"
                            style={style.button}
                            title={this.props.buttonText}
                            onPress={() => this.goNext()}/>
                </View>
            </View>
        );
    }
}

const stepDescs = [
    "First, we need to know some basics about you",
    "When you receive the code by SMS, please type it",
    "It's the last page that's requires your keyboard.",
    "Place your picture",
    "Almost there !"
];
const mapStateToProps = state => (
    {
        step: state.SignUpReducer.step,
        stepDescription: state.SignUpReducer.stepDescription,
        buttonText: state.SignUpReducer.buttonText,
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
        errorMessage: state.SignUpReducer.errorMessage,
        countryList: state.AppReducer.countries,
        showPicker: state.SignUpReducer.showPicker
    }
);

export default connect(mapStateToProps, {
    setCountry,
    setShowPicker,
    setStep,
    setUsername,
    setEmail,
    setMobileNumber
})(signUp);