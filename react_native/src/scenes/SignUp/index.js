import React from 'react';
import {
    Animated, View, Text, Button, TextInput, Picker,
    TouchableOpacity, Image, Switch, Keyboard
} from 'react-native';
import {connect} from 'react-redux';
import {StepProgress} from '../../components';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import {
    setPassword,setMobileNumber,setCountry,setEmail,setName,setPhoneUUID,
    setPicture,setPrivacyOptions,setTos,setUsername,setVenues
} from "../../actions/SignUpActions";
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
            passwordConfirmation : ''
        };
        setInterval(() => {
            console.log(this.props.address);
        },3000);
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
        this.fadeOut();
        setTimeout(() => {
            this.setState({step : this.state.step +1});
            this.fadeIn();
        }, 700);
    }

    showFooterPicker() {
        if (this.state.showPicker) {
            return (
                <View style={style.picker}>
                    <TouchableOpacity onPress={() => this.setState({ showPicker: false})}>
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

    showSelectedCountry() {
        if (this.props.address.country.iso) {
            return this.props.address.country.name
        } else {
            return 'Select country';
        }
    }
    resendCode(){
        if (this.state.resendTimeOut > 0) {
            // pop error
        }
        else {
            this.setState({ resendTimeOut: 60 });
        }
    }
    renderStep0() {
        if (this.state.step == 0) {
            return (
                <View>
                    <View>
                        <TouchableOpacity style={style.formRow} onPress={() => this.setState({ showPicker : true})}>
                            <Text
                                style={
                                    [
                                        style.textInput,
                                        {opacity: this.props.address.country.iso ? 1 : 0.5}
                                    ]
                                }>{this.showSelectedCountry()}</Text>
                            <View style={{paddingRight: 15}}><Text style={{color: '#68d6f9'}}>?</Text></View>
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
                            this.setState({resendTimeOut : this.state.resendTimeOut - 1});
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
                                       style={style.codeTextInput}
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
                                       style={style.codeTextInput}
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
                                       style={style.codeTextInput}
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
                                       style={style.codeTextInput}
                                       onChangeText={(text) => {
                                           this.setState({codeInp4: text})
                                           if (text == '') {
                                               this.code3.focus();
                                           } else {
                                               this.setState({ code : this.state.codeInp1 +
                                                   this.state.codeInp2 +
                                                   this.state.codeInp3 +
                                                   this.state.codeInp4});
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
                            onPress={() => { this.resendCode()}}>
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
                            placeholder="Your name"
                            onChangeText={value => this.props.setName(value)}/>
                    </View>
                    <View style={style.formRow}>
                        <TextInput
                            style={style.textInput}
                            placeholder="Choose a password"
                            onChangeText={value => this.props.setPassword(value)}/>
                    </View>
                    <View style={style.formRow}>
                        <TextInput
                            style={style.textInput}
                            placeholder="Confirm your password"
                            onChangeText={value => this.setState({ passwordConfirmation: value})}/>
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
        //alert(JSON.stringify(this.props.venues));
        if (this.state.step == 4) {
            return (
                <View style={style.step4}>
                    <Text style={style.groupTitle}>Favorites Venues</Text>
                    {this.props.venuesList.map(venue => {
                        return (
                            <View style={style.groupItem}>
                                <View style={style.groupTextWrapper}>
                                    <Text style={style.groupItemInfo}>[I]</Text>
                                    <Text style={style.groupItemText}>{venue.name}</Text>
                                </View>
                                <Switch onTintColor='#68d6f9'/>
                            </View>
                        )
                    })}
                    <Text style={style.groupTitle}>Initial Privacy Settings</Text>
                    {this.props.privacyList.map(privacy => {
                        return (
                            <View style={style.groupItem}>
                                <View style={style.groupTextWrapper}>
                                    <Text style={style.groupItemInfo}>[I]</Text>
                                    <Text style={style.groupItemText}>{privacy}</Text>
                                </View>
                                <Switch onTintColor='#68d6f9'/>
                            </View>
                        )
                    })}
                </View>
            );
        }
    }

    render() {
        return (
            <View style={style.page}>
                <Animated.View style={[style.form, {opacity: this.state.fadeAnim}]}>
                    {this.renderStep0()}
                    {this.renderStep1()}
                    {this.renderStep2()}
                    {this.renderStep3()}
                    {this.renderStep4()}
                </Animated.View>
                <View style={style.progress}>
                    <StepProgress/>
                    <View style={style.stepDescriptionContainer}>
                        <Text style={style.stepDescriptionText}>{stepDescs[this.state.step]}</Text>
                    </View>
                </View>
                <View style={style.footer}>
                    {this.showFooterPicker()}
                    <Button color="#68d6f9"
                            style={style.button}
                            title='Continue'
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
const totalSteps = 5;
const mapStateToProps = state => (
    {
        address: state.SignUpReducer.address,
        mobileNumber: state.SignUpReducer.mobileNumber,
        email: state.SignUpReducer.email,
        username: state.SignUpReducer.username,
        name: state.SignUpReducer.name,
        password: state.SignUpReducer.password,
        picture: state.SignUpReducer.picture,
        privacyOptions: state.SignUpReducer.privacyOptions,
        countryList: state.AppReducer.countries,
        venuesList: state.AppReducer.venues,
        privacyList: state.AppReducer.privacyOptions
    }
);

export default connect(mapStateToProps, {
    setPassword,
    setMobileNumber,
    setCountry,
    setEmail,
    setName,
    setPhoneUUID,
    setPicture,
    setPrivacyOptions,
    setTos,
    setUsername,
    setVenues
})(signUp);