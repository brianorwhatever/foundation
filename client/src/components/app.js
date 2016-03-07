import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from  '../store/configureStore';
import AppHeader from './app-header';
import Todos from './todos';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <AppHeader title={'Todotoo'}/>
          <Todos />
        </div>
      </Provider>
    );
  }
}

export default App;
