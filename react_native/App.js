import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import Routes from './Routes';
import reducers from './src/reducers';
import {Font} from "expo";

export default class App extends React

.Component {
    componentDidMount() {
        Font.loadAsync({
            FontAwesome:
                require('./src/fonts/fontawesome-webfont.ttf')
        });
    }
  render() {
      return (
          <Provider store={createStore(reducers,{}, applyMiddleware(ReduxThunk))}>
              <Routes/>
          </Provider>
      );
  }
}