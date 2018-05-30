import React from 'react'
import {View, Text, Image} from 'react-native'
import ViewOverflow from 'react-native-view-overflow'

import style from './style'

export class StepProgress extends React.Component {
  drawSteps () {
    let output = []
    const steps = this.props.steps
    for (let i = 0; i < steps; i++) {
      output.push(
        <ViewOverflow style={[style.circle, i < steps - 1 ? style.circleSeparator : null]} key={'sp' + i}>
          <Text style={style.text}>{i + 1}</Text>
          <Image
            source={require('../../imgs/donut.jpg')}
            style={[style.currentBullet, i === this.props.step ? style.show : style.hide]} />
          <Image
            source={require('../../imgs/bart.png')}
            style={[style.pastIcon, (this.props.step > i && this.props.step > 0) ? style.show : style.hide]} />
        </ViewOverflow>)
    }
    return output.map(item => {
      return (item)
    })
  }
  render () {
    return (
      <ViewOverflow style={style.container}>
        <View style={[style.line, {width: 38 * (this.props.steps - 1)}]} />
        {this.drawSteps()}
      </ViewOverflow>
    )
  }
}
