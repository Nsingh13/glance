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

import PlacesTile from '../components/searchScreen/PlacesTile';

export default class SearchScreen extends React.Component {

  render() {
    return (
      <Container>
      <PlacesTile />
      <Button
            dark
            block
            iconLeft
             style={{marginTop: '3%'}}
           >
            <Icon name='md-call'/>
            <Text>Find By Phone</Text>
          </Button>
          <Button
            dark
            block
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


