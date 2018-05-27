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
import {CheckAvailability, SendSMS,ConfirmSMS} from "../../services/registration";
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
            passwordConfirmation: 'Dallas1234',
            mobileNumber: '447903450712',
            fullMobileNumber: null,
            buttonText: 'Continue',
            username: 'xxxxxx',
            phoneUUID: '',
            phoneCode: '',
            picture: '',
            password: 'Dallas1234',
            name: {
                title: '',
                name: 'My name'
            },
            birthDay: '',
            bio: '',
            gender: '',
            address: {
                streetLine1: '',
                streetLine2: '',
                city: '',
                stateOrCounty: '',
                postCode: '',
                latitude: '',
                longitude: '',
                country: {
                    iso: '',
                    name: '',
                    areaCode: ''
                }
            },
            venues: [],
            email: 'xxxx@edeee.com',
            privacyOptions: [],
            tos: '',
            customData: {}
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
    displayNextForm(){
        this.fadeOut();
        setTimeout(() => {
            this.setState({step: this.state.step + 1});
            this.fadeIn();
        }, 700);
    }
    bottomButtomAction() {
        if (this.state.step == 0) {
            this.submitStep0();
        }
        if (this.state.step == 1) {
            this.submitStep1();
        }
        if (this.state.step == 2) {
            this.submitStep2();
        }
    }
    resendCode() {
        if (this.state.resendTimeOut > 0) {
            ShowToast('critical', 'Please wait a bit more.')
        }
        else {
            this.setState({resendTimeOut: 60,
            codeInp1: '',
            codeInp2: '',
            codeInp3: '',
            codeInp4: '',
            code: ''});
            this.code1.focus();
            SendSMS(this.state.fullMobileNumber).then(successfully => {
                if (!successfully) {
                    ShowToast('critical', 'Unable to send SMS - Server error');
                }
            });
        }
    }
    performAvailabilityChecks() {
        return new Promise(resolve => {
            let checks = [
                {
                    endPoint: 'checkUsernameAvailability',
                    bodyKey: 'username',
                    textForMsg: 'Username already taken.Chose another one.',
                    value: this.state.username.toLowerCase(),
                    isAvailable: false,
                    error: undefined
                },
                {
                    endPoint: 'checkMobileAvailability',
                    bodyKey: 'mobile',
                    textForMsg: 'Mobile number already in use. Try to recover your password instead',
                    value: this.state.mobileNumber,
                    isAvailable: false,
                    error: undefined
                },
                {
                    endPoint: 'checkEmailAvailability',
                    bodyKey: 'email',
                    textForMsg: 'E-mail already in use. Try to recover your password instead',
                    value: this.state.email.toLowerCase(),
                    isAvailable: false,
                    error: undefined
                }
            ];
            //ToDo: Find some how to transform it in a pure function.
            let checked = 0;
            checks.forEach(async c => {
                try {
                    const response = await CheckAvailability(c.endPoint, c.bodyKey, c.value);
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
    submitStep0() {
        if(this.state.address.country.iso === '' || !this.state.mobileNumber || !this.state.email || !this.state.username){
            ShowToast('critical', 'All fields are mandatory');
            return;
        }
        let rgMobile = new RegExp(/^\d+$/);
        if(!rgMobile.test(this.state.mobileNumber) || this.state.mobileNumber.length < 8 || this.state.mobileNumber.length > 15) {
            ShowToast('critical','Invalid mobile number');
            return;
        }
        let rgEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(!rgEmail.test(this.state.email)) {
            ShowToast('critical','Invalid E-Mail');
            return;
        }
        let rgUsername = new RegExp(/^[0-9a-zA-Z]+$/);
        if(!rgUsername.test(this.state.username)) {
            ShowToast('critical','Only alphanumeric and numbers characters are allowed for username.');
            return;
        }
        if (!isNaN(+this.state.username.substring(1,0)) ) {
            ShowToast('critical','Username cannot start with a number');
            return;
        }
        if (this.state.username.length > 20 || this.state.username.length < 2) {
            ShowToast('critical', 'Username must have between 2 and 15 characters');
            return;
        }
        this.setState({fullMobileNumber : this.state.address.country.areaCode + this.state.mobileNumber});
        this.performAvailabilityChecks().then(result => {
            let passed = true;
            result.forEach(r => {
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
                SendSMS(this.state.fullMobileNumber).then(successfully => {
                    if (successfully) {
                        this.displayNextForm()
                    } else {
                        ShowToast('critical', 'Unable to send SMS - Server error');
                    }
                });
            }
        })

}
    async submitStep1() {
        console.log(this.state.code,this.state.fullMobileNumber)
        try {
            const response = await ConfirmSMS(this.state.code,this.state.fullMobileNumber )
            console.log(response);
            if (response.status == 200) {
                const {data} = response.data;
                this.setState({ phoneUUID: data.uuid})
                this.displayNextForm();
            }
            else {
                setTimeout(() =>{
                    this.setState({
                        codeInp1: '',
                        codeInp2: '',
                        codeInp3: '',
                        codeInp4: '',
                        code: ''
                    });
                    this.code1.focus();
                },750)
                ShowToast('critical', 'Invalid code - Please retry');
            }
        }
        catch (err) {
            this.showToast('critical', 'Unable to proceed - Server error');
        }
    }
    submitStep2() {
        if (this.state.name.name.length > 50 || this.state.name.name.length < 2) {
            ShowToast('critical' , 'Your name must have between 2 and 50 characters');
            return;
        }
        if (this.state.password === '' || this.state.passwordConfirmation === '') {
            ShowToast('critical','Both passwords are mandatory');
            return;
        }
        let rgPass = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$/);
        if(!rgPass.test(this.state.password)) {
            ShowToast('critical', 'Password must have between 4 and 12 digits and must include numbers, lower and upper letters');
            return;
        }
        if (this.state.password !== this.state.passwordConfirmation) {
            ShowToast('critical', 'Passwords do not match')
            return;
        }
        this.displayNextForm()
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
                            onChangeText={value => this.setState({email: value})}/>
                    </View>
                    <View style={style.formRow}>
                        <TextInput
                            style={style.textInput}
                            underlineColorAndroid='transparent'
                            value={this.state.username}
                            maxLength={20}
                            placeholder="Choose an username"
                            onChangeText={value => this.setState({username: value})}/>
                    </View>
                </View>
            )
        }
        return;
    }
    renderStep1() {
        if (this.state.step == 1) {
            setTimeout(() => {
                if (this.state.codeInp1 == '' && this.state.codeInp2 == '' &&
                    this.state.codeInp3 == '' && this.state.codeInp4 == '' &&
                    this.state.resendTimeOut == 60) {
                    this.code1.focus();
                    setInterval(() => {
                        if (this.state.resendTimeOut > 0) {
                            this.setState({resendTimeOut: this.state.resendTimeOut - 1});
                        }

                    }, 1000);
                }
            }, 800);
            return (
                <View style={style.step1}>
                    <View style={style.codeEntry}>
                        <View style={style.codeDigit}>
                            <TextInput ref={(inp) => {
                                this.code1 = inp
                            }}
                                       maxLength={1}
                                       value={this.state.codeInp1}
                                       style={style.codeTextInput}
                                       underlineColorAndroid='transparent'
                                       keyboardType='numeric'
                                       onChangeText={(text) => {
                                           this.setState({codeInp1: text})
                                           this.code2.focus();
                                       }
                                       }
                            />
                        </View>
                        <View style={style.codeDigit}>
                            <TextInput ref={(inp) => {
                                this.code2 = inp
                            }}
                                       maxLength={1}
                                       value={this.state.codeInp2}
                                       style={style.codeTextInput}
                                       underlineColorAndroid='transparent'
                                       keyboardType='numeric'
                                       onChangeText={(text) => {
                                           this.setState({codeInp2: text})
                                           if (text == '') {
                                               this.code1.focus();
                                           } else {
                                               this.code3.focus();
                                           }
                                       }
                                       }
                            />
                        </View>
                        <View style={style.codeDigit}>
                            <TextInput ref={(inp) => {
                                this.code3 = inp
                            }}
                                       maxLength={1}
                                       value={this.state.codeInp3}
                                       style={style.codeTextInput}
                                       keyboardType='numeric'
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => {
                                           this.setState({codeInp3: text})
                                           if (text == '') {
                                               this.code2.focus();
                                           } else {
                                               this.code4.focus();
                                           }
                                       }
                                       }
                            />
                        </View>
                        <View style={style.codeDigit}>
                            <TextInput ref={(inp) => {
                                this.code4 = inp
                            }}
                                       maxLength={1}
                                       value={this.state.codeInp4}
                                       style={style.codeTextInput}
                                       keyboardType='numeric'
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => {
                                           this.setState({codeInp4: text})
                                           if (text == '') {
                                               this.code3.focus();
                                           } else {
                                               this.setState({codeInp4: text});
                                               this.setState({
                                                   code: this.state.codeInp1 +
                                                   this.state.codeInp2 +
                                                   this.state.codeInp3 +
                                                   text
                                               });
                                               Keyboard.dismiss();
                                           }
                                       }
                                       }
                            />
                        </View>
                    </View>
                    <View style={style.buttonContainer}>
                        <TouchableOpacity
                            style={style.buttonBorder}
                            onPress={() => {
                                this.resendCode()
                            }}>
                            <Text style={style.buttonText2}>
                                Send the code
                                again {this.state.resendTimeOut > 0 ? '(' + this.state.resendTimeOut + ')' : ''}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        return;
    }
    renderStep2() {
        if (this.state.step == 2) {
            return (
                <View>
                    <View style={style.formRow}>
                        <TextInput
                            style={style.textInput}
                            value={this.state.name.name}
                            placeholder="Your name"
                            underlineColorAndroid='transparent'
                            onChangeText={value => this.setState({ name: { title: '', name: value }})}/>
                    </View>
                    <View style={style.formRow}>
                        <TextInput
                            style={style.textInput}
                            value={this.state.password}
                            placeholder="Choose a password"
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            onChangeText={value => this.setState({password: value})}/>
                    </View>
                    <View style={style.formRow}>
                        <TextInput
                            style={style.textInput}
                            value={this.state.passwordConfirmation}
                            placeholder="Confirm your password"
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            onChangeText={value => this.setState({passwordConfirmation: value})}/>
                    </View>
                </View>
            );
        }
    }
    render() {
        return (
            <View behavior="padding" style={style.page}>
                <Animated.View style={[style.form, {opacity: this.state.fadeAnim}]}>
                    {this.renderStep0()}
                    {this.renderStep1()}
                    {this.renderStep2()}
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

export default connect(mapStateToProps, {})(Register);