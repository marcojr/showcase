import React from 'react';
import {connect} from 'react-redux';
import { View, Text, TouchableOpacity, Dimensions, TextInput, AsyncStorage} from 'react-native';
import Image from 'react-native-scalable-image';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-root-toast';
import { setUsername, setPassword, setMode} from "../../actions/SignInActions";
import { setTextView } from "../../actions/TextViewActions";
import { setAppData, setAppUser } from "../../actions/AppActions";


import style from './style'

import api from '../../services/api';
class welcome extends React.Component {
    getReady = async () => {
        try {
            const response = await api.get('/v1/registration/getReady');
            const {successfully, data} = response.data;
            this.props.setAppData(data);
            //Actions.signUp();
        }
        catch(err) {
            console.log(err);
        }
    };
    componentDidMount() {
        this.getReady();
    }
    showInputs() {
        this.props.setMode('input');
    }
    hideInputs() {
        this.props.setMode('chooseAction');
    }
    doLogin() {
        const loginBody = {
            usernameOrMobile : this.props.username,
            password: this.props.password,
            appVersion: 1,
            localRnd: 'zzzzzzz',
            appType: 'mobile',
            deviceInfo : null
        }
        try {
            api.post('/v1/session/login', loginBody).then(response => {
                const rd = response.data;
                console.log(rd.data);
                if (response.status == 200) {
                    this.props.setAppUser(rd.data);
                    this.saveKey('user',rd.data);
                    Actions.home();
                }
                else {
                    this.showToast('critical', 'Invalid Credentials');
                }
            });
        }
        catch(err) {
            this.showToast('critical', 'Server error');
        }
    }
    async saveKey(key,value) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log("Error saving data" + error);
        }
    }
    showToast(type, msg) {
        let bg = 'black';
        let tc = 'white';

        if(type=='successfully') {
            bg='green';
        }
        if(type=='critical') {
            bg='red';
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
    startSignUp() {
        Actions.signUp();
    }
    goToTos(){
        this.props.setTextView(
            {
                title: 'Terms',
                text: this.props.texts.tos,
                showButton: true,
                buttonTitle : 'I agree',
                buttonAction : this.startSignUp
            }
        );
        Actions.textView();
    }
    renderBellowLogo() {
        if(this.props.mode == 'chooseAction') {
            return (
                <View>
                    <TouchableOpacity style={style.buttons} onPress={() => this.goToTos()}>
                        <Text style={style.buttonsText}>New User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.buttons} onPress={() => this.showInputs()}>
                        <Text style={style.buttonsText}>Login</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            return(
                <View style={style.loginForm}>
                    <View style={[style.loginFormRow, style.loginFormBottomBorder]}>
                        <View style={style.loginFormCol1}>
                            <Text style={style.icons}>
                                <FontAwesome>{Icons.user}</FontAwesome>
                            </Text>
                        </View>
                        <View style={style.loginFormCol2}>
                            <TextInput
                                style={style.input} placeholderTextColor='#9ce7ff'
                                underlineColorAndroid='transparent'
                                placeholder="Username or mobile"
                                value={this.props.username}
                                onChangeText={value => this.props.setUsername(value)}/>
                        </View>
                    </View>
                    <View style={[style.loginFormRow, style.loginFormBottomBorder]}>
                        <View style={style.loginFormCol1}>
                            <Text style={style.icons}>
                                <FontAwesome>{Icons.lock}</FontAwesome>
                            </Text>
                        </View>
                        <View style={style.loginFormCol2}>
                            <TextInput
                                style={style.input}
                                placeholderTextColor='#9ce7ff'
                                placeholder="Password"
                                secureTextEntry={true}
                                underlineColorAndroid='transparent'
                                value={this.props.password}
                                onChangeText={value => this.props.setPassword(value)}/>
                        </View>
                    </View>
                    <View style={style.loginFormRow}>
                        <View style={style.formActionsCol}>
                            <TouchableOpacity>
                                <Text style={style.txtForgot}>Forgot your password ?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={style.formActionsCol}>
                            <TouchableOpacity style={style.buttonSmall} onPress={() => this.doLogin()}>
                                <Text style={style.buttonsText}>Log me in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={style.loginFormRow}>
                        <TouchableOpacity onPress={() => this.hideInputs()}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
    render() {
        return(
        <View style={style.page}>
            <View style={style.upper}>
                <Image width={this.props.mode =='chooseAction' ? sw : sw / 2}  source={require('../../imgs/homer.png')} />
                { this.renderBellowLogo()}
            </View>
            <View style={style.lower}>
                <Image width={Dimensions.get('window').width}  source={require('../../imgs/springfield.png')} />
            </View>
        </View>
        )
    }
}

const sw = Dimensions.get('window').height > 600 ? Dimensions.get('window').width * .40 : Dimensions.get('window').width * .35;

const mapStateToProps = state => (
    {
        username: state.SignInReducer.username,
        password: state.SignInReducer.password,
        mode: state.SignInReducer.mode,
        texts: state.AppReducer.texts
    }
);

export default connect(mapStateToProps,
    {
        setUsername,
        setPassword,
        setMode,
        setTextView,
        setAppData,
        setAppUser
    })(welcome);