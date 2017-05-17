import Expo from 'expo';
import axios from 'axios';
import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {NavigationProvider, StackNavigation} from '@expo/ex-navigation';
import {FontAwesome} from '@expo/vector-icons';

import Router from './navigation/Router';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';

import store from './components/redux/store';
import {Provider} from "react-redux";


class AppContainer extends React.Component {
  state = {
    appIsReady: false
  };

  componentWillMount() {
    this._loadAssetsAsync();

  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [require('./assets/images/expo-wordmark.png')],
        fonts: [
          FontAwesome.font, {
            'Roboto_medium': require('./assets/fonts/Roboto_medium.ttf')
          }
        ]
      });
    } catch (e) {
      console.warn('There was an error caching assets (see: main.js), perhaps due to a network timeo' +
          'ut, so we skipped caching. Reload the app to try again.');
      console.log(e.message);
    } finally {
      this.setState({appIsReady: true});
    }
  }

  render() {
    if (this.state.appIsReady) {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            <StatusBar backgroundColor="blue"/>
            <NavigationProvider router={Router}>
              <StackNavigation
                id="root"
                initialRoute={Router.getRoute('login')}
                defaultRouteConfig={{
                navigationBar: {
                  visible: false
                }
              }}/>
            </NavigationProvider>

            {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
            {Platform.OS === 'android' && <View style={styles.statusBarUnderlay}/>}
          </View>
        </Provider>
      );
    } else {
      return <Provider store={store}><Expo.AppLoading/></Provider>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
});

Expo.registerRootComponent(AppContainer);
