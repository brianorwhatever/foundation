import React from 'react';
import { Provider, connect } from 'react-redux';

import AppHeader from './app-header';
import Todos from './todos';

import store from '../store/configureStore';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <AppHeader title={'Todos App'} tagline={'sweet todos'}/>
          <Todos />
        </div>
      </Provider>
    );
  }
}

export default App;
