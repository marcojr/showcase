import React from 'react'
import {Router, Stack, Scene, Actions} from 'react-native-router-flux'
import {Image} from 'react-native'

// Scenes
import Welcome from '../scenes/Welcome'
import Home from '../scenes/Home'
import TextView from '../scenes/TextView'
import Register from '../scenes/Register'

export default props => (
  <Router navigationBarStyle={{backgroundColor: '#68d6f9'}} titleStyle={{color: '#FFF'}}
    backButtonBarStyle={{color: '#FFF'}}
    barButtonTextStyle={{color: 'red'}}>
    <Stack key='root'>
      <Scene key='welcome' component={Welcome} title='Welcome' hideNavBar />
      <Scene key='home' component={Home} title='Home' hideNavBar={false} left={() => null} />
      <Scene key='textView' component={TextView} title='' hideNavBar={false} backTitle=' ' />
      <Scene key='register' component={Register} title='Registration' hideNavBar={false}
        left={<Image style={{height: 40, width: 50, marginLeft: 10, marginTop: 3}} source={require('../imgs/nelson.png')} />}
        rightTitle={'X'}
        onRight={() => Actions.welcome()} />
    </Stack>
  </Router>
)
