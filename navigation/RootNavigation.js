import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {connect} from "react-redux";
import {
    fetchMainNavigator
} from "../components/redux/userActions";
import {Notifications} from 'expo';
import {StackNavigation, TabNavigation, TabNavigationItem} from '@expo/ex-navigation';
import {FontAwesome} from '@expo/vector-icons';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync
from '../api/registerForPushNotificationsAsync';
import Router from '../navigation/Router';

import {Container, Footer, Content} from 'native-base';

import EditProfilePopup from '../components/rootNavigation/EditProfilePopup';

@connect((store) => {
    return {mainNavigator: store.mainNavigator}
}, null, null)

export default class RootNavigation extends React.Component {

  constructor(props)
    {
        super(props);
        this.state = {
        }
    }

    componentWillMount()
    {

    }

  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();

   this
      .props
      .dispatch(fetchMainNavigator(this.props.navigator));
  }

  componentWillUnmount() {
    this._notificationSubscription && this
      ._notificationSubscription
      .remove();
  }


  render() {

    const form = this;

    return (

      <Container>
        
        <TabNavigation tabBarHeight={46} initialTab="home">
          <TabNavigationItem
            id="links"
            renderIcon={isSelected => this._renderIcon('users', isSelected)}>
            <StackNavigation initialRoute={Router.getRoute('search')}/>
          </TabNavigationItem>

          <TabNavigationItem
            id="home"
            renderIcon={isSelected => this._renderIcon('eye', isSelected)}>
            <StackNavigation initialRoute={Router.getRoute('home')}/>
          </TabNavigationItem>

          <TabNavigationItem
            id="settings"
            renderIcon={isSelected => this._renderIcon('comments', isSelected)}>
            <StackNavigation initialRoute={Router.getRoute('chat')}/>
          </TabNavigationItem>
        </TabNavigation> 

        <EditProfilePopup />
      </Container>

    )

  }
  _renderIcon(name, isSelected) {
    return (<FontAwesome
      name={name}
      size={25}
      color={isSelected
      ? '#d9534f'
      : Colors.tabIconDefault}/>);
  }

  _registerForPushNotifications() { // Send our push token over to our backend so we can receive notifications You
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
    // color: Colors.tabIconSelected
    color: '#d9534f'
  }
})
