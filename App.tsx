/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackScreen} from './src/routes/RootStackScreen';
import {Provider} from 'react-redux';
import {store} from './src/model/store';
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
