import React from 'react'
import {View, ImageBackground, Button} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {Logout} from '../../services/session'

import style from './style'
import { setAppUser } from '../../actions/AppActions'

class welcome extends React.Component {
  componentDidMount () {
    Actions.refresh({title: 'Thanks, ' + this.props.user.name.name})
  }
  logout () {
    this.props.setAppUser(null)
    try {
      Logout(this.props.user.uuid).then(() => {
        Actions.welcome()
      })
    } catch (err) {
      Actions.welcome()
    }
  }
  render () {
    return (
      <View style={style.page}>
        <ImageBackground style={{flex: 1}} source={require('../../imgs/bkg1.jpg')}>
          <View style={style.content} />
          <View style={style.footer}>
            <Button color='#fff'
              style={style.button}
              title='Logout'
              onPress={() => this.logout()}
            />
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const mapStateToProps = state => (
  {
    user: state.AppReducer.user
  }
)

export default connect(mapStateToProps, {
  setAppUser
})(welcome)
