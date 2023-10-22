import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import AppNavigator from '../navigation/AppNavigator';
import store from '../store';

const BaseProvider = () => {
  return (
    <Provider store={store}>
      <StatusBar animated={true} barStyle="light-content" />
      <AppNavigator />
    </Provider>
  );
};

export default BaseProvider;
