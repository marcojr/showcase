import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';
import { Image} from 'react-native';

//Scenes
import Welcome from './src/scenes/Welcome';
import Home from './src/scenes/Home';
import SignUp from './src/scenes/SignUp';
import TextView from './src/scenes/TextView'

export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#68d6f9'}} titleStyle={{ color: '#FFF'}}
            backButtonBarStyle={{color : "#FFF"}}
            barButtonTextStyle={{color: 'red'}}>
        <Stack key='root'>
            <Scene key='welcome' component={Welcome} title='Welcome' hideNavBar={ true } initial />
            <Scene key='home' component={Home} title='Home' hideNavBar={ false } left={()=>null}  />
            <Scene key='textView' component={TextView} title='TextView' hideNavBar={ false } backTitle=' ' />
            <Scene key='signUp' component={SignUp} title='Registration' hideNavBar={ false }
                   left={<Image style={{height:40, width: 50, marginLeft: 10, marginTop:3}} source={require('./src/imgs/nelson.png')}></Image>}
                   rightTitle={'X'}
                   onRight={ () => Actions.welcome()}/>
        </Stack>
    </Router>
);