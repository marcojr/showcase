import React from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'

// Scenes
import Welcome from '../scenes/Welcome'
import Home from '../scenes/Home'
import TextView from '../scenes/TextView'

export default props => (
  <Router navigationBarStyle={{backgroundColor: '#68d6f9'}} titleStyle={{color: '#FFF'}}
    backButtonBarStyle={{color: '#FFF'}}
    barButtonTextStyle={{color: 'red'}}>
    <Stack key='root'>
      <Scene key='welcome' component={Welcome} title='Welcome' hideNavBar initial />
      <Scene key='home' component={Home} title='Home' hideNavBar={false} left={() => null} />
        <Scene key='textView' component={TextView} title='' hideNavBar={ false } backTitle=' ' />
    </Stack>
  </Router>
)
