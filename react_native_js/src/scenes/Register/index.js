import React from 'react';
import {Actions} from 'react-native-router-flux';
import {
    Animated, View, Text, Button, TextInput,
    TouchableOpacity, Image, Switch, Keyboard, KeyboardAvoidingView, Platform
} from 'react-native';
import {connect} from 'react-redux';
import {StepProgress} from '../../components';
import ModalSelector from 'react-native-modal-selector'
import FontAwesome, {Icons} from 'react-native-fontawesome';
import {CheckAvailability,SendSMS} from "../../services/registration";
import {ShowToast} from '../../libs/utils'

import style from './style';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
            codeInp1: '',
            codeInp2: '',
            codeInp3: '',
            codeInp4: '',
            code: '',
            step: 0,
            resendTimeOut: 60,
            showPicker: false,
            passwordConfirmation: '',
            mobileNumber: '447903450712',
            buttonText: 'Continue',
            username : 'xxxxxx',
            phoneUUID : '',
            phoneCode : '',
            picture : '',
            password : 'Dallas1234',
            name :{
                title : '',
                name: 'My name'
            },
            birthDay: '',
            bio : '',
            gender : '',
            address : {
                streetLine1 : '',
                streetLine2 : '',
                city : '',
                stateOrCounty : '',
                postCode : '',
                latitude : '',
                longitude : '',
                country : {
                    iso: '',
                    name: '',
                    areaCode : ''
                }
            },
            venues: [],
            email : 'xxxx@edeee.com',
            privacyOptions : [],
            tos : '',
            customData : {}
        };
    }
    componentDidMount() {
        this.fadeIn();
    }
    fadeIn() {
        Animated.timing(
            this.state.fadeAnim,
            {toValue: 1},
        ).start();
    }

    fadeOut() {
        Animated.timing(
            this.state.fadeAnim,
            {toValue: 0},
        ).start();
    }
    selectCountry() {
        let data = [];
        this.props.countryList.map(item => {
            data.push({
                key: item.iso,
                label: item.name,
                fullObject: item
            });
        })
        return (
            <ModalSelector
                data={data}
                selectStyle={{borderWidth: 0, opacity: this.state.address.country.iso ? 1 : 0.5}}
                selectTextStyle={style.textInput}
                initValue="Select country"
                supportedOrientations={['portrait']}
                onChange={
                    itemValue => this.setState(
                        {
                            address: {
                                streetLine1: '',
                                streetLine2: '',
                                city: '',
                                stateOrCounty: '',
                                postCode: '',
                                latitude: '',
                                longitude: '',
                                country: itemValue.fullObject
                            }
                        }
                    )
                }>
            </ModalSelector>
        );
    }
    bottomButtomAction() {
        if (this.state.step == 0) {
            this.performAvailabilityChecks().then(result => {
                let passed = true;
                result.forEach(r =>{
                    if (r.error) {
                        passed = false;
                        ShowToast('critical', 'Unable to proceed - Server error');
                        return;
                    }
                    if (!r.isAvailable) {
                        passed = false;
                        ShowToast('critical', r.textForMsg);
                        return;
                    }
                })
                if (passed) {
                    SendSMS(this.state.mobileNumber).then(successfully => {
                        if (successfully) {
                            alert('Ok, sent !')
                        } else {
                            ShowToast('critical', 'Unable to send SMS - Server error');
                        }
                    });
                }
            })
        }
    }
    performAvailabilityChecks() {
            return new Promise(resolve => {
                let checks = [
                    {
                        endPoint : 'checkUsernameAvailability',
                        bodyKey : 'username',
                        textForMsg : 'Username already taken.Chose another one.',
                        value : this.state.username.toLowerCase(),
                        isAvailable: false,
                        error : undefined
                    },
                    {
                        endPoint : 'checkMobileAvailability',
                        bodyKey : 'mobile',
                        textForMsg : 'Mobile number already in use. Try to recover your password instead',
                        value : this.state.mobileNumber,
                        isAvailable: false,
                        error : undefined
                    },
                    {
                        endPoint : 'checkEmailAvailability',
                        bodyKey : 'email',
                        textForMsg : 'E-mail already in use. Try to recover your password instead',
                        value : this.state.email.toLowerCase(),
                        isAvailable: false,
                        error : undefined
                    }
                ];
                //ToDo: Find some how to transform it in a pure function.
                let checked = 0;
                checks.forEach(async c => {
                    try {
                        const response = await CheckAvailability(c.endPoint, c.bodyKey , c.value);
                        const {data} = response.data;
                        c.isAvailable = data.isAvailable;
                        checked++;
                        if (checked === checks.length) {
                            resolve(checks);
                        }
                    }
                    catch (err) {
                        c.error = err.error;
                        checked++;
                        if (checked === checks.length) {
                            resolve(checks);
                        }
                    }
                });
            });
        }
    renderStep0() {
        if (this.state.step == 0) {
            return (
                <View>
                    <View>
                        <View style={style.formRowDD}>
                            {this.selectCountry()}
                            <View style={{paddingRight: 15}}><Text style={{
                                color: '#68d6f9',
                                fontSize: 20
                            }}><FontAwesome>{Icons.caretDown}</FontAwesome></Text></View>
                        </View>
                    </View>
                    <View style={style.formRow}>
                        <TextInput
                            style={style.textInput}
                            value={this.state.mobileNumber}
                            keyboardType='numeric'
                            underlineColorAndroid='transparent'
                            placeholder="Mobile number (w/o country code)"
                            maxLength={14}
                            onChangeText={value => this.setState({mobileNumber: value})}/>
                    </View>
                    <View style={style.formRow}>
                        <TextInput
                            style={style.textInput}
                            maxLength={60}
                            underlineColorAndroid='transparent'
                            keyboardType='email-address'
                            value={this.state.email}
                            placeholder="Email"
                            onChangeText={value => this.setState({ email: value})}/>
                    </View>
                    <View style={style.formRow}>
                        <TextInput
                            style={style.textInput}
                            underlineColorAndroid='transparent'
                            value={this.state.username}
                            maxLength={16}
                            placeholder="Choose an username"
                            onChangeText={value => this.setState({ username: value})}/>
                    </View>
                </View>
            )
        }
        return;
    }
    render() {
        return (
            <View behavior="padding" style={style.page}>
                <Animated.View style={[style.form, {opacity: this.state.fadeAnim}]}>
                    {this.renderStep0()}
                </Animated.View>
                <View style={style.progress}>
                    <StepProgress step={this.state.step} steps={totalSteps}/>
                    <View style={style.stepDescriptionContainer}>
                        <Text style={style.stepDescriptionText}>{stepDescs[this.state.step]}</Text>
                    </View>
                </View>
                <View style={style.footer}>
                    <Button color="#68d6f9"
                            style={style.button}
                            title={this.state.buttonText}
                            onPress={() => this.bottomButtomAction()}/>
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
const totalSteps = 5;

const mapStateToProps = state => (
    {
        countryList: state.AppReducer.countries,
        venuesList: state.AppReducer.venues,
        privacyList: state.AppReducer.privacyOptions,
        tos: state.AppReducer.texts.tos
    }
);

export default connect(mapStateToProps, {

})(Register);