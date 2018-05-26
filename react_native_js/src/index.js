import React from 'react'
import {Provider} from 'react-redux'
import {View,  Animated,Text} from 'react-native'
import {createStore, applyMiddleware} from 'redux'
import Spinner from 'react-native-loading-spinner-overlay'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import Routes from './config/routes'
import {getReady} from './services/registration'
import {setAppInitialLoad, setAppSpinner, setAppToast} from './actions/AppActions'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            initialized: false,
            spinner: {
                visible: false,
                text: ''
            }
        }
        store.subscribe(() => {
                //ToDo: I really hope to find an elegant solition for this.
                //Since it' the top level JS file of the app, I can't use
                //connect/mapStateToProps to map the props :(
                const spinner = store.getState().AppReducer.spinner
                if (spinner.visible != this.state.spinner.visible) {
                    this.setState({spinner});
                }
            }
        )
    }
    componentDidMount() {
        store.dispatch(setAppSpinner({visible: true, text: 'Loading...'}))
        getReady().then(response => {
            store.dispatch(setAppInitialLoad(response.data.data))
            store.dispatch(setAppSpinner({visible: false, text: ''}))
            this.setState({initialized: true})
        })
    }

    render() {
        if (this.state.initialized) {
            return (
                <View style={{flex:1}}>
                    <Provider store={store}>
                        <Routes/>
                    </Provider>
                    <Spinner visible={this.state.spinner.visible}
                             textContent={this.state.spinner.text}
                             textStyle={{color: '#000'}}/>
                </View>
            )
        } else {
            return (
                <View style={{backgroundColor: 'yellow', flex: 1}}/>
            )
        }
    }
}
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
export default App
