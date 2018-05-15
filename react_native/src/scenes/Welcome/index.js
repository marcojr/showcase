import React from 'react';
import {connect} from 'react-redux';
import { View, Text, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import Image from 'react-native-scalable-image';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Actions } from 'react-native-router-flux';
import { setUsername, setPassword, setMode, doLogin, goToTos,} from "../../actions/SignInActions";
import { setTextView } from "../../actions/TextViewActions";


import style from './style'

import api from '../../services/api';
class welcome extends React.Component {
    getReady = async () => {
        try {
            console.log('loading...');
            const response = await api.get('/v1/registration/getReady');
            const {successfully, data} = response.data;
            console.log(data);
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
        const { username,password } = this.props;
        this.props.doLogin({username,password});
    }
    startSignUp() {
        Actions.signUp();
    }
    goToTos(){
        this.props.setTextView(
            {
                title: 'Terms',
                text: 'Some words',
                showButton: true,
                buttonTitle : 'I agree',
                buttonAction : this.startSignUp
            }
        );
        this.props.goToTos();
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
                                placeholder="Username or mobile"
                                value={this.props.username}/>
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
                                value={this.props.password}/>
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

const sw = Dimensions.get('window').width * .40;

const mapStateToProps = state => (
    {
        username: state.SignInReducer.username,
        password: state.SignInReducer.password,
        mode: state.SignInReducer.mode
    }
);

export default connect(mapStateToProps,
    {
        setUsername,
        setPassword,
        setMode,
        doLogin,
        goToTos,
        setTextView
    })(welcome);