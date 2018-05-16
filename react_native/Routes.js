import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';


//Scenes
import Welcome from './src/scenes/Welcome';
import Home from './src/scenes/Home';
import SignUp from './src/scenes/SignUp';
import TextView from './src/scenes/TextView'

export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#68d6f9'}} titleStyle={{ color: '#FFF'}}>
        <Stack key='root'>
            <Scene key='welcome' component={Welcome} title='Welcome' hideNavBar={ true } initial/>
            <Scene key='home' component={Home} title='Home' hideNavBar={ false } />
            <Scene key='textView' component={TextView} title='TextView' hideNavBar={ false } />
            <Scene key='signUp' component={SignUp} title='Registration' hideNavBar={ false }  />
        </Stack>
    </Router>
);