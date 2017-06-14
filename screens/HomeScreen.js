import React from 'react';
import {View, Text} from 'react-native';
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

import SearchBar from '../components/homeScreen/SearchBar';

import Router from '../navigation/Router';
import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation';


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
    this.state = {}
    
  }

  componentDidMount()
  {
  }

  render() {

    return (
      <Container>

        <SearchBar  
        navigator={this.props.navigator}
        router={Router}
        />

      </Container>
    );
  }

}
