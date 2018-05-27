import React from 'react'
import {Actions} from 'react-native-router-flux'
import {View, Text, Button, ScrollView} from 'react-native'

import style from './style'

class textView extends React.Component {
  componentDidMount () {
    Actions.refresh({title: this.props.title})
  }
  showButton () {
    if (this.props.showButton) {
      return (
        <View style={style.footer}>
          <Button color='#68d6f9'
            style={style.button}
            title={this.props.buttonTitle}
            onPress={() => this.props.buttonAction()} />
        </View>
      )
    }
  }
  render () {
    return (
      <View style={style.page}>
        <View style={style.content}>
          <ScrollView>
            <Text>{this.props.text}</Text>
          </ScrollView>
        </View>
        {this.showButton()}
      </View>
    )
  }
}
export default textView
