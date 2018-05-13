import React from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text,Button, ScrollView} from 'react-native';
import {connect} from 'react-redux';

import style from './style';

class textView extends React.Component {
    componentDidMount() {
        Actions.refresh({title: this.props.title});
        //alert(JSON.stringify(this.props));
    }
    showButton(){
        if(this.props.showButton) {
            return (
                <View style={style.footer}>
                    <Button color="#68d6f9"
                            style={style.button}
                            title={this.props.buttonTitle}
                            onPress={() => this.props.buttonAction()}/>
                </View>
            );
        }
        return;
    }
    render() {
        return(
            <View style={style.page}>
                <View style={style.content}>
                    <ScrollView>
                        <Text>{this.props.text}</Text>
                    </ScrollView>
                </View>
                {this.showButton()}
            </View>
        );
    }
}
const mapStateToProps = state => (
    {
        title: state.TextViewReducer.title,
        text: state.TextViewReducer.text,
        showButton: state.TextViewReducer.showButton,
        buttonTitle : state.TextViewReducer.buttonTitle,
        buttonAction: state.TextViewReducer.buttonAction
    }
);

export default connect(mapStateToProps, {})(textView);