import React from 'react';
import {View} from 'react-native';
import {Constants} from 'expo';

import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Content,
  Text,
  Card,
  CardItem
} from 'native-base';

export default class PlacesTile extends React.Component {

  render() {
    return (
      <Content>
        <Card style={{
          marginTop: Constants.statusBarHeight
        }}>
          <CardItem header>
            <Text style={{fontWeight: '500'}}>My Places</Text>
          </CardItem>
          <Icon
            name='md-pin'
            style={{
            fontSize: 150,
            color: 'lightgrey',
            alignSelf: 'center'
          }}/>
          <Text
            style={{
            alignSelf: 'center',
            color: 'gray',
            marginTop: '2%'
          }}>No Places Added (Yet)</Text>
          <Button
            danger
            rounded
            iconLeft
            style={{
            alignSelf: 'center',
            marginTop: '10%',
            marginBottom: '10%'
          }}>
            <Icon name='md-add-circle'/>
            <Text>Add One Now!</Text>
          </Button>
        </Card>
      </Content>
    );
  }
}