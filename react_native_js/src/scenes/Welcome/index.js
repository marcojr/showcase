import React from 'react'
import {connect} from 'react-redux'
import {View, Text, TouchableOpacity, Dimensions, TextInput, Keyboard,Animated} from 'react-native'
import ImageSelfScale from 'react-native-scalable-image'
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
      password: 'Abc1234',
        showFooter: true,
        logoWidth: new Animated.Value(sw),
        logoHeight: new Animated.Value(sh)
    }
  }
    logoLarge () {
        Animated.parallel([
        Animated.timing(
            this.state.logoWidth,
            {toValue: sw}
        ),
        Animated.timing(
            this.state.logoHeight,
            {toValue: sh}
        )
            ]).start()
    }

    logoSmall () {
        Animated.parallel([
        Animated.timing(
            this.state.logoWidth,
            {toValue: sw /2}
        ),
        Animated.timing(
            this.state.logoHeight,
            {toValue: sh /2}
        )
            ]).start()
    }
  componentDidMount () {
        Keyboard.addListener('keyboardDidShow', () => this.setState({ showFooter: false}))
        Keyboard.addListener('keyboardDidHide', () => this.setState({ showFooter: true}))
      this.logoLarge()
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
          <TouchableOpacity style={style.buttons} onPress={() => {
              {
                  this.setState({mode: 'input'})
                  this.logoSmall()
                  setTimeout(() => {
                      this.username.focus()
                  },100)
              }
          }}>
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
                  ref={(inp) => {
                      this.username = inp
                  }}
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
            <TouchableOpacity onPress={() => {
              this.setState({mode: 'chooseAction'})
                this.logoLarge()
            }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
  renderFooter() {
    if(this.state.showFooter){
      return(<View style={style.lower}>
          <ImageSelfScale width={Dimensions.get('window').width} source={require('../../imgs/springfield.png')} />
      </View>)
    }
  }
  render () {
    return (
      <View style={style.page}>
        <View style={style.upper}>
          <Animated.Image style={{width: this.state.logoWidth,  height:this.state.logoHeight}}
            source={require('../../imgs/homer.png')} />
          {this.renderBellowLogo()}
        </View>
          {this.renderFooter()}
      </View>
    )
  }
}
const sw = Dimensions.get('window').height > 600 ? Dimensions.get('window').width * 0.40 : Dimensions.get('window').width * 0.30
const sh = sw * (647/466) // proportional ratio
const mapStateToProps = state => (
  {
    texts: state.AppReducer.texts,
    appVersion: state.AppReducer.appVersion,
    localRnd: state.AppReducer.localRnd
  }
)
export default connect(mapStateToProps, {setAppUser, setAppSpinner})(welcome)
