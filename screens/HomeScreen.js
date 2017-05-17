import React from 'react';
import {Constants} from 'expo';
import {View, Text, StatusBar} from 'react-native';
import {connect} from "react-redux";

import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Content
} from 'native-base';

@connect((store) => {
  return {user: store.user, isNewUser: store.isNewUser}
})
export default class HomeScreen extends React.Component {

  static route = {
    navigationBar: {
      visible: false
    }

  }

  constructor(props) {
    super(props);
    // Set State
    this.state = {}
  }

  render() {
    const {isNewUser} = this.props.isNewUser;

    return (
      <Container>

        <Header
          searchBar
          rounded
          style={{
          backgroundColor: 'white',
          marginTop: Constants.statusBarHeight
        }}>
          <StatusBar translucent={false} backgroundColor="blue"/>
          <Item>
            <Icon name="ios-search"/>
            <Input placeholder="Search"/>
            <Icon name="ios-people"/>
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>

      </Container>
    );
  }

}
