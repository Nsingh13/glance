import React from 'react';
import {View} from 'react-native';
import {connect} from "react-redux";
import axios from 'axios';

import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Content,
  Text
} from 'native-base';

import SearchBar from '../components/homeScreen/SearchBar';

import Router from '../navigation/Router';
import {createRouter, NavigationProvider, StackNavigation} from '@expo/ex-navigation';

import firebaseClient from '../components/firebaseClient';

@connect((store) => {
  return {user: store.user}
}, null, null)
export default class HomeScreen extends React.Component {

  static route = {
    navigationBar: {
      visible: false
    }

  }

  constructor(props) {
    super(props);
    // Set State
    this.state = {
      glancedUsers: null
    }

  }

  componentWillMount()
  {
    const form = this;

    // Fetch all 'glanced' users from database
    axios
      .get('http://10.0.0.207:3000/users', {

        params: {
          email: firebaseClient
            .auth()
            .currentUser
            .email
        }

      })
      .then(function (response) {
        form.setState({glancedUsers: response.data.glancedUsers})
      })

  }

  componentDidMount()
  {}

  render() {

    if (this.state.glancedUsers == null) {
      return (
        <Container>

          <SearchBar navigator={this.props.navigator} router={Router}/>

          <Content >
            <Icon
              name='md-person'
              style={{
              fontSize: 200,
              alignSelf: 'center',
              marginTop: '25%',
              color: 'lightgrey'
            }}/>
            <Text style={{alignSelf: 'center', color: 'gray'}}>No Users Added to List</Text>
            <Text style={{marginLeft: '16%', marginTop: '21%', color: 'gray'}}>Find People Now!</Text>
            <Icon
              name='ios-arrow-round-down-outline'
              style={{
              fontSize: 50,
              marginLeft: '14%',
              color: 'gray'
            }}/>
          </Content>

        </Container>
      );
    } else {
      return (
        <Container>

          <SearchBar navigator={this.props.navigator} router={Router}/>

          <Content >
            // TODO: Show glanced users
          </Content>

        </Container>
      );
    }

  }

}
