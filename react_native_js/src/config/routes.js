import React from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'

// Scenes
import Welcome from '../scenes/Welcome'

export default props => (
  <Router navigationBarStyle={{backgroundColor: '#68d6f9'}} titleStyle={{color: '#FFF'}}
    backButtonBarStyle={{color: '#FFF'}}
    barButtonTextStyle={{color: 'red'}}>
    <Stack key='root'>
      <Scene key='welcome' component={Welcome} title='Welcome' hideNavBar initial />
    </Stack>
  </Router>
)
