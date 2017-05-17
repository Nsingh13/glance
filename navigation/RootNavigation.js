import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {connect} from "react-redux";
import {Notifications} from 'expo';
import {StackNavigation, TabNavigation, TabNavigationItem} from '@expo/ex-navigation';
import {FontAwesome} from '@expo/vector-icons';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync
from '../api/registerForPushNotificationsAsync';
import Router from '../navigation/Router';

import {Container, Footer, Content} from 'native-base';

import EditProfilePopup from '../components/homeScreen/EditProfilePopup';

@connect((store) => {
  return {isNewUser: store.isNewUser}
})
export default class RootNavigation extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();

  }

  componentWillUnmount() {
    this._notificationSubscription && this
      ._notificationSubscription
      .remove();
  }

  render() {

    return (
      <Container>

        <TabNavigation tabBarHeight={46} initialTab="home">
          <TabNavigationItem
            id="links"
            renderIcon={isSelected => this._renderIcon('book', isSelected)}>
            <StackNavigation initialRoute="search"/>
          </TabNavigationItem>

          <TabNavigationItem
            id="home"
            renderIcon={isSelected => this._renderIcon('home', isSelected)}>
            <StackNavigation initialRoute="home"/>
          </TabNavigationItem>

          <TabNavigationItem
            id="settings"
            renderIcon={isSelected => this._renderIcon('cog', isSelected)}>
            <StackNavigation initialRoute="chat"/>
          </TabNavigationItem>
        </TabNavigation>

        {this.props.isNewUser
          ? <EditProfilePopup />
          : null}

      </Container>
    );
  }

  _renderIcon(name, isSelected) {
    return (<FontAwesome
      name={name}
      size={25}
      color={isSelected
      ? Colors.tabIconSelected
      : Colors.tabIconDefault}/>);
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications You
    // can comment the following line out if you want to stop receiving a
    // notification every time you open the app. Check out the source for this
    // function in api/registerForPushNotificationsAsync.js
    // registerForPushNotificationsAsync(); Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({origin, data}) => {
    this
      .props
      .navigator
      .showLocalAlert(`Push notification ${origin} with data: ${JSON.stringify(data)}`, Alerts.notice);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  selectedTab: {
    color: Colors.tabIconSelected
  }
});
