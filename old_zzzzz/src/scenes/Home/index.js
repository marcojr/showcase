import React from 'react';
import { View, ImageBackground, Button} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';

import style from './style'


class welcome extends React.Component {
    componentDidMount() {
        console.log( this.props.user.name.name);
        Actions.refresh({title:  'Thanks, ' + this.props.user.name.name});
    }
    render() {
        return(
            <View style={style.page}>
                <ImageBackground style={{flex:1}} source={require('../../imgs/bkg1.jpg')}>
                    <View style={style.content}>
                    </View>
                        <View style={style.footer}>
                            <Button color="#fff"
                                    style={style.button}
                                    title='Logout'
                                    onPress={() => this.props.buttonAction()}
                            />
                        </View>
                </ImageBackground>
            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        user: state.AppReducer.user
    }
);

export default connect(mapStateToProps, {})(welcome);