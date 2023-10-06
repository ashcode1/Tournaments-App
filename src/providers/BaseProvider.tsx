import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Tournaments from '../screens/Tournaments';

const BaseProvider = () => {
  return (
    <Provider store={store}>
      <Tournaments />
    </Provider>
  );
};

export default BaseProvider;
