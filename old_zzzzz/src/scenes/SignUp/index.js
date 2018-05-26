import React from 'react';
import {Actions} from 'react-native-router-flux';
import api from '../../services/api';
import {
    Animated, View, Text, Button, TextInput,
    TouchableOpacity, Image, Switch, Keyboard, KeyboardAvoidingView, Platform
} from 'react-native';
import Toast from 'react-native-root-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {StepProgress} from '../../components';
import ModalSelector from 'react-native-modal-selector'
import FontAwesome, {Icons} from 'react-native-fontawesome';
import {
    setPassword, setCountry, setEmail, setName, setPhoneUUID,
    setPicture, setPrivacyOptions, setTos, setUsername, setVenues
} from "../../actions/SignUpActions";
import {setTextView} from "../../actions/TextViewActions";
import style from './style';

class signUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0), // init opacity 0,
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
            spinner: {
                show: false,
                text: ''
            }
        };
        setTimeout(() => {
            let vf = [];

            this.props.venuesList.map(item => {
                let itm = item;
                itm.inUse = false;
                vf.push(itm);
                this.props.setVenues(vf)
            });
            let pf = [];
            for (let i = 0; i < this.props.privacyList.length; i++) {
                pf.push({
                    desc: this.props.privacyList[i].desc,
                    key: this.props.privacyList[i].key,
                    payLoad: this.props.privacyList[i],
                    selected: false
                });
            }
            this.props.setPrivacyOptions(pf);
        }, 3000);

        setInterval(() => {
            //console.log(this.props.venuesList);
            //console.log(this.props.privacyList);
            //console.log(this.props.countryList);
            //console.log(this.props.privacyOptions);
            //console.log(this.props.privacyOptions);
            //console.log('------');
        }, 3000);
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

    goNext() {
        if (this.state.step == 0) {
            this.performAllAvailabilityChecks().then(result => {
                let passed = true;
                for (let i = 0; i < result.length; i++) {
                    if (result[i].error) {
                        this.showToast('critical', 'Unable to proceed - Server error');
                        break;
                    }
                    if (!result[i].isAvailable) {
                        passed = false;
                        this.showToast('critical', result[i].textForMsg);
                        break;
                    }
                }
                if (passed) {
                    this.sendSMS(this.state.mobileNumber).then(successfully => {
                        if (successfully) {
                            this.displayNextForm();
                        } else {
                            this.showToast('critical', 'Unable to proceed - Server error');
                        }
                    });
                }
            });
            return;
        }
        if (this.state.step == 1) {
            this.confirmSMS();
        }
        if (this.state.step == 2) {
            this.displayNextForm();
        }
        if (this.state.step == 3) {
            this.displayNextForm();
            this.setState({buttonText: 'Finish'});
        }
        if (this.state.step == 4) {
            this.register();
        }
    }

    register() {
        const getPrivacySelections = () => {
            let results = [];
            for (let i = 0; i < this.props.privacyOptions.length; i++) {
                let po = this.props.privacyOptions[i].payLoad;
                if (this.props.privacyOptions[i].selected && this.props.privacyOptions[i].payLoad.availableOptions.length === 3) {
                    po.value = 2;
                }
                if (!this.props.privacyOptions[i].selected && this.props.privacyOptions[i].payLoad.availableOptions.length === 3) {
                    po.value = 0;
                }
                if (this.props.privacyOptions[i].payLoad.availableOptions.length === 2) {
                    po.value = this.props.privacyOptions[i].selected ? 2 : 0;
                }
                if (po.value != 0) {
                    results.push(po)
                }
                ;
            }
            return results;
        }
        const getVenuesSelections = () => {
            let results = [];
            for (let i = 0; i < this.props.venues.length; i++) {
                if (this.props.venues[i].inUse) {
                    results.push(this.props.venues[i].key);
                }
            }
            return results;
        }
        const venuesSelections = getVenuesSelections();
        if (venuesSelections.length < 1) {
            this.showToast('critical', 'Choose at least one venue');
            return;
        }
        //this.props.setPrivacyOptions(getPrivacySelections());
        //this.props.setVenues(venuesSelections);
        const registration = {
            "username": this.props.username,
            "phoneUUID": this.props.phoneUUID,
            "phoneCode": this.state.code,
            "picture": null,
            "password": this.props.password,
            "name": {
                "title": "",
                "name": this.props.name.name
            },
            "bio": "",
            "gender": null,
            "birthDay": null,
            "address": {
                "streetLine1": "",
                "streetLine2": "",
                "city": "",
                "stateOrCounty": "",
                "postCode": "",
                "latitude": null,
                "longitude": null,
                "country": this.props.address.country
            },
            "email": this.props.email,
            "privacyOptions": getPrivacySelections(),
            "venues": venuesSelections,
            "tos": this.props.tos,
            "customData": null
        }
        console.log('9999');
        console.log(registration);
        this.setState({
            spinner: {
                show: true,
                text: 'Registering you...'
            }
        });
        api.post('/v1/registration/register', registration).then(response => {
            if (response.status == 200) {
                this.setState({
                    spinner: {
                        show: false,
                        text: ''
                    }
                });
                this.showToast('successfully', 'Successfully Registered ! Please login.');
                Actions.welcome();
            }
            else {
                this.showToast('critical', 'Unable to register - Server error');
            }

        });
    }

    async sendSMS(mobileNumber) {
        try {
            const response = await api.post('/v1/registration/sendSMS', {mobileNumber});
            if (response.status == 200) {
                return true
            } else {
                return false
            }
        }
        catch (err) {
            return false
        }
    }

    async confirmSMS() {
        const smsBody = {
            code: this.state.code,
            mobileNumber: this.state.mobileNumber
        }
        try {
            const response = await api.post('/v1/registration/confirmSMS', smsBody);
            console.log(response);
            if (response.status == 200) {
                const {data} = response.data;
                this.props.setPhoneUUID(data.uuid);
                this.displayNextForm();
            }
            else {
                this.setState({
                    codeInp1: '',
                    codeInp2: '',
                    codeInp3: '',
                    codeInp4: '',
                    code: ''
                });
                this.code1.focus();
                this.showToast('critical', 'Invalid code - Please retry');
            }
        }
        catch (err) {
            this.showToast('critical', 'Unable to proceed - Server error');
        }
    }

    displayNextForm() {
        this.fadeOut();
        setTimeout(() => {
            this.setState({step: this.state.step + 1});
            this.fadeIn();
        }, 700);
    }

    showFooterPicker() {
        if (this.state.showPicker) {
            return (
                <View style={style.picker}>
                    <TouchableOpacity onPress={() => this.setState({showPicker: false})}>
                        <View style={style.closePicker}>
                            <Text>X</Text>
                        </View>
                    </TouchableOpacity>
                    <Picker
                        selectedValue={this.props.address.country.iso}
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

    showToast(type, msg) {
        let bg = 'black';
        let tc = 'white';

        if (type == 'successfully') {
            bg = 'green';
        }
        if (type == 'critical') {
            bg = 'red';
        }
        Toast.show(msg, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            backgroundColor: bg,
            textColor: tc
        });
    }

    showInfo(name, txt) {
        this.props.setTextView(
            {
                title: name,
                text: txt,
                showButton: false
            }
        );
        Actions.textView();
    }

    showSelectedCountry() {
        if (this.props.address.country.iso) {
            return this.props.address.country.name
        } else {
            return 'Select country';
        }
    }

    updateVenue(venue, value) {
        let venuesTemp = JSON.stringify(this.props.venues);
        venuesTemp = JSON.parse(venuesTemp);
        venuesTemp.forEach(v => {
            if (v.key == venue.key) {
                v.inUse = value;
                this.props.setVenues(venuesTemp);
            }
        });
    }

    updatePrivacy(privacy, value) {
        let privacyTemp = JSON.stringify(this.props.privacyOptions);
        privacyTemp = JSON.parse(privacyTemp);
        privacyTemp.forEach(p => {
            if (p.key == privacy.key) {
                p.selected = value;
                this.props.setPrivacyOptions(privacyTemp);
            }
        });

    }

    performAllAvailabilityChecks() {
        return new Promise(resolve => {
            let checks = [
                {
                    endPoint: '/v1/registration/checkUsernameAvailability',
                    bodyKey: 'username',
                    textForMsg: 'Username already taken.Chose another one.',
                    value: this.props.username.toLowerCase(),
                    isAvailable: false,
                    error: undefined
                },
                {
                    endPoint: '/v1/registration/checkMobileAvailability',
                    bodyKey: 'mobile',
                    textForMsg: 'Mobile number already in use. Try to recover your password instead',
                    value: this.state.mobileNumber,
                    isAvailable: false,
                    error: undefined
                },
                {
                    endPoint: '/v1/registration/checkEmailAvailability',
                    bodyKey: 'email',
                    textForMsg: 'E-mail already in use. Try to recover your password instead',
                    value: this.props.email.toLowerCase(),
                    isAvailable: false,
                    error: undefined
                }
            ];
            let checked = 0;
            checks.forEach(async c => {
                try {
                    const response = await api.get(c.endPoint + '?' + c.bodyKey + '=' + c.value);
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

    resendCode() {
        if (this.state.resendTimeOut > 0) {
            this.showToast('critical', 'Please wait a bit more.');
        }
        else {
            this.setState({resendTimeOut: 60});
            this.sendSMS(this.state.mobileNumber).then(successfully => {
                if (successfully) {
                    this.showToast('successfully', 'SMS code has been sent');
                } else {
                    this.showToast('critical', 'Unable to proceed - Server error');
                }
            });
        }
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
                selectStyle={{borderWidth: 0, opacity: this.props.address.country.iso ? 1 : 0.5}}
                selectTextStyle={style.textInput}
                initValue="Select country"
                supportedOrientations={['portrait']}
                onChange={itemValue => this.props.setCountry(itemValue.fullObject)}>
            </ModalSelector>
        );
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
                            placeholder="Mobile number (without country code)"
                            onChangeText={value => this.setState({mobileNumber: value})}/>
                    </View>
                    <View style={style.formRow}>
                        <TextInput
                            style={style.textInput}
                            underlineColorAndroid='transparent'
                            keyboardType='email-address'
                            value={this.props.email}
                            placeholder="Email"
                            onChangeText={value => this.props.setEmail(value)}/>
                    </View>
                    <View style={style.formRow}>
                        <TextInput
                            style={style.textInput}
                            underlineColorAndroid='transparent'
                            value={this.props.username}
                            placeholder="Choose an username"
                            onChangeText={value => this.props.setUsername(value)}/>
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
                            value={this.props.name.name}
                            placeholder="Your name"
                            underlineColorAndroid='transparent'
                            onChangeText={value => this.props.setName(value)}/>
                    </View>
                    <View style={style.formRow}>
                        <TextInput
                            style={style.textInput}
                            value={this.props.password}
                            placeholder="Choose a password"
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            onChangeText={value => this.props.setPassword(value)}/>
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

    renderStep3() {
        if (this.state.step == 3) {
            return (
                <View style={style.step3}>
                    <View style={style.pictureBorder}>
                        <Image
                            source={{uri: 'https://cdn.shopify.com/s/files/1/1235/0120/products/2016-Bart-T-shirt-close_1024x1024.jpg?v=1476869972'}}
                            style={style.picture}/>
                    </View>
                    <View>
                        <TouchableOpacity style={[style.buttonBorder, {marginTop: 20}]}>
                            <Text style={style.buttonText2}>Select from camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[style.buttonBorder, {marginTop: 20}]}>
                            <Text style={style.buttonText2}>Select from album</Text>
                        </TouchableOpacity>
                        <Text style={[style.stepDescriptionText, {marginTop: 20}]}>You can skip this for now, if you
                            wish
                        </Text>
                    </View>
                </View>
            )
        }
    }

    renderStep4() {
        if (this.state.step == 4 && this.props.privacyOptions.length == 2) {
            return (
                <View style={style.step4}>
                    <Text style={style.groupTitle}>Favorites Venues</Text>
                    {this.props.venues.map(venue => {
                        return (
                            <View style={style.groupItem} key={venue.key}>
                                <View style={style.groupTextWrapper}>
                                    <TouchableOpacity onPress={() => this.showInfo(venue.name, venue.description)}>
                                        <Text style={style.groupItemInfo}><FontAwesome>{Icons.infoCircle}</FontAwesome></Text>
                                    </TouchableOpacity>
                                    <Text style={style.groupItemText}>{venue.name}</Text>
                                </View>
                                <Switch onTintColor='#68d6f9' value={venue.inUse}
                                        onValueChange={(val => this.updateVenue(venue, val))}/>
                            </View>
                        )
                    })}
                    <Text style={style.groupTitle}>Initial Privacy Settings</Text>
                    {this.props.privacyOptions.map(privacy => {
                        return (
                            <View style={style.groupItem} key={privacy.key}>
                                <View style={style.groupTextWrapper}>
                                    <Text style={style.groupItemText}>{privacy.desc}</Text>
                                </View>
                                <Switch onTintColor='#68d6f9' value={privacy.selected}
                                        onValueChange={(val) => this.updatePrivacy(privacy, val)}/>
                            </View>
                        )
                    })}
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
                    {this.renderStep3()}
                    {this.renderStep4()}
                </Animated.View>
                <View style={style.progress}>
                    <StepProgress step={this.state.step} steps={totalSteps}/>
                    <View style={style.stepDescriptionContainer}>
                        <Text style={style.stepDescriptionText}>{stepDescs[this.state.step]}</Text>
                    </View>
                </View>
                <View style={style.footer}>
                    {this.showFooterPicker()}
                    <Button color="#68d6f9"
                            style={style.button}
                            title={this.state.buttonText}
                            onPress={() => this.goNext()}/>
                </View>
                <Spinner visible={this.state.spinner.show} textContent={this.state.spinner.text}
                         textStyle={{color: '#FFF'}}/>
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
        address: state.SignUpReducer.address,
        email: state.SignUpReducer.email,
        username: state.SignUpReducer.username,
        name: state.SignUpReducer.name,
        password: state.SignUpReducer.password,
        picture: state.SignUpReducer.picture,
        privacyOptions: state.SignUpReducer.privacyOptions,
        venues: state.SignUpReducer.venues,
        countryList: state.AppReducer.countries,
        venuesList: state.AppReducer.venues,
        privacyList: state.AppReducer.privacyOptions,
        phoneUUID: state.SignUpReducer.phoneUUID,
        tos: 'here is the tos'
    }
);

export default connect(mapStateToProps, {
    setPassword,
    setCountry,
    setEmail,
    setName,
    setPhoneUUID,
    setPicture,
    setPrivacyOptions,
    setTos,
    setUsername,
    setVenues,
    setTextView
})(signUp);