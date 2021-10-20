// StackMe
// A home excersie for Cyrus
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { MainScreen } from './screens/MainScreen';

export default function App() {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}