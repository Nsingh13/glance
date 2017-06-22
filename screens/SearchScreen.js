import React from 'react';
import { View } from 'react-native';

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

import Router from '../navigation/Router';
import PlacesTile from '../components/searchScreen/PlacesTile';

export default class SearchScreen extends React.Component {

   static route = {
    navigationBar: {
      visible: false
    }

  }

  constructor(props) {
    super(props);
    // Set State
    this.state = {

    }
  }

  render() {
    const form = this;

    return (
      <Container>
      <PlacesTile navigator={form.props.navigator} router={Router}/>
      <Button
            dark
            full
            iconLeft
             style={{marginTop: '3%'}}
           >
            <Icon name='md-call'/>
            <Text>Find By Phone</Text>
          </Button>
          <Button
            dark
            full
            iconLeft
            style={{marginTop: '4%', marginBottom: '9%'}}
           >
            <Icon name='md-mail'/>
            <Text>Find By Email</Text>
          </Button>
      </Container>
    );
  }
}


