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
import SplashScreen from 'react-native-splash-screen';

class App extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    store.dispatch.httpClient.initializeHttpClient();
    SplashScreen.hide();
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <RootStackScreen />
        </NavigationContainer>
      </Provider>
    );
  }
}
export default App;
