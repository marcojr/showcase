import React from 'react'
import {connect} from 'react-redux'
import {View, Text, TouchableOpacity, Dimensions, TextInput} from 'react-native'
import Image from 'react-native-scalable-image'
import FontAwesome, {Icons} from 'react-native-fontawesome'
import {Actions} from 'react-native-router-flux'
import {setAppUser, setAppSpinner} from '../../actions/AppActions'
import {ShowToast, WriteToLocalDB} from '../../libs/utils'
import {Login} from '../../services/session'

import style from './style'

class welcome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mode: 'chooseAction',
      username: 'bob',
      password: 'Abc1234'
    }
  }
  goToRegister () {
    Actions.register()
  }
  goToTos () {
    Actions.textView({
      title: 'Terms',
      text: this.props.texts.tos,
      showButton: true,
      buttonTitle: 'I agree',
      buttonAction: this.goToRegister
    })
  }
  doLogin () {
    this.props.setAppSpinner({
      visible: true,
      text: 'Logging you...'
    })
    let loginBody = {
      usernameOrMobile: this.state.username,
      password: this.state.password,
      appVersion: this.props.appVersion,
      localRnd: parseFloat(this.props.localRnd),
      appType: 'mobile',
      deviceInfo: ''
    }
    try {
      Login(loginBody).then(response => {
        const rd = response.data
        if (response.status === 200) {
          this.props.setAppSpinner({
            visible: false,
            text: ''
          })
          this.props.setAppUser(rd.data)
          WriteToLocalDB('user', JSON.stringify(rd.data))
          Actions.home()
        } else {
          ShowToast('critical', 'Invalid Credentials')
          this.props.setAppSpinner({
            visible: false,
            text: ''
          })
        }
      })
    } catch (err) {
      ShowToast('critical', 'Server error')
      this.props.setAppSpinner({
        visible: false,
        text: ''
      })
    }
  }

  renderBellowLogo () {
    if (this.state.mode === 'chooseAction') {
      return (
        <View>
          <TouchableOpacity style={style.buttons} onPress={() => this.goToTos()}>
            <Text style={style.buttonsText}>New User</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.buttons} onPress={() => this.setState({mode: 'input'})}>
            <Text style={style.buttonsText}>Login</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
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
                placeholder='Username'
                value={this.state.username}
                onChangeText={value => this.setState({username: value})} />
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
                placeholder='Password'
                secureTextEntry
                underlineColorAndroid='transparent'
                value={this.state.password}
                onChangeText={value => this.setState({password: value})} />
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
      )
    }
  }

  render () {
    return (
      <View style={style.page}>
        <View style={style.upper}>
          <Image width={this.state.mode === 'chooseAction' ? sw : sw / 2}
            source={require('../../imgs/homer.png')} />
          {this.renderBellowLogo()}
        </View>
        <View style={style.lower}>
          <Image width={Dimensions.get('window').width} source={require('../../imgs/springfield.png')} />
        </View>
      </View>
    )
  }
}

const sw = Dimensions.get('window').height > 600 ? Dimensions.get('window').width * 0.40 : Dimensions.get('window').width * 0.35
const mapStateToProps = state => (
  {
    texts: state.AppReducer.texts,
    appVersion: state.AppReducer.appVersion,
    localRnd: state.AppReducer.localRnd
  }
)
export default connect(mapStateToProps, {setAppUser, setAppSpinner})(welcome)
