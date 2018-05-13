import React from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import {connect} from "react-redux";

import style from './style';

class StepProgress extends React.Component {
    drawSteps(){
        let output =[];
        const steps = this.props.totalSteps;
        for(let i=0 ; i < steps; i++){
            output.push(
                <View style={[style.circle, i < steps-1 ? style.circleSeparator : null]} key={'sp' + i}>
                    <Text style={style.text}>{i+1}</Text>
                    <Image
                        source={require('../../imgs/donut.jpg')}
                        style={[style.currentBullet, i==this.props.step ? style.showBullet : style.hideBullet]}/>
                </View>);
        }
        return output.map(item => {
            return(item);
        });
    }
    render() {
        return(
            <View style={style.container}>
                <View style={[style.line, {width: 38 * (this.props.totalSteps -1)}]} />
                {this.drawSteps()}
            </View>
        );
    }
}



const mapStateToProps = state => (
    {
        step: state.SignUpReducer.step,
        totalSteps: state.SignUpReducer.totalSteps
    }
);

export default connect(mapStateToProps, {})(StepProgress);