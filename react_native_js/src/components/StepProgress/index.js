import React from 'react'
import {View, Text, Image, Animated} from 'react-native'

import style from './style'

export class StepProgress extends React.Component {
    drawSteps(){
        let output =[];
        const steps = this.props.steps;
        for(let i=0 ; i < steps; i++){
            output.push(
                <View style={[style.circle, i < steps-1 ? style.circleSeparator : null]} key={'sp' + i}>
                    <Text style={style.text}>{i+1}</Text>
                    <Image
                        source={require('../../imgs/donut.jpg')}
                        style={[style.currentBullet, i==this.props.step ? style.show : style.hide]}/>
                    <Image
                        source={require('../../imgs/bart.png')}
                        style={[style.pastIcon, (this.props.step > i && this.props.step >0) ? style.show : style.hide]}/>
                </View>);
        }
        return output.map(item => {
            return(item);
        });
    }
    render() {
        return(
            <View style={style.container}>
                <View style={[style.line, {width: 38 * (this.props.steps -1)}]} />
                {this.drawSteps()}
            </View>
        );
    }
}