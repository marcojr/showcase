import React from 'react'
import {connect} from 'react-redux'
import { View,Text,Button } from 'react-native'
import { ShowToast } from "../../libs/toast";

class welcome extends React.Component {
    componentDidMount() {
        console.log(this.props.texts.tos)
    }
  render () {
      return (<View style={{flex:1}}>
          <Button onPress={() => ShowToast('critical','hello')} title='Press me'/>
          <Text>{this.props.texts.tos}</Text>
      </View>)
  }
}

const mapStateToProps = state => (
  {
    texts: state.AppReducer.texts
  }
)
export default connect(mapStateToProps, {})(welcome)
