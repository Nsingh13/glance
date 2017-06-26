import React from 'react';
import {Platform, View, TouchableOpacity} from 'react-native';
import {MapView, Constants, Location, Permissions} from 'expo';
import axios from 'axios';

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
  CardItem,
  List,
  Right,
  Left,
  Body
} from 'native-base';

import firebaseClient from '../firebaseClient';

console.disableYellowBox = true;

export default class PlacesTile extends React.Component {

  constructor(props) {
    super(props);
    // Set State
    this.state = {
      addedPlaces: []
    }
  }

  _AddPlacePress()
  {
    // Go To Map Screen
    this
      .props
      .navigator
      .push(this.props.router.getRoute('map', {
        reMount: this
          .componentWillMount
          .bind(this)
      }));
  }

  componentWillMount()
  {
    const form = this;

    // Fetch all added 'places' from database
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
        form.setState({addedPlaces: response.data.places})
      })
  }

  render() {
    const form = this;

    return (

      <Content>
        {form.state.addedPlaces.length == 0
          ? <Card
              style={{
              marginTop: Constants.statusBarHeight
            }}>
              <CardItem header>
                <Text style={{
                  fontWeight: '500'
                }}>My Places</Text>
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
              }}
                onPress={this
                ._AddPlacePress
                .bind(this)}>
                <Icon name='md-add-circle'/>
                <Text>Add One Now!</Text>
              </Button>
            </Card>

          : <Card style={{
            marginTop: Constants.statusBarHeight
          }}>

            <CardItem header>
              <Text style={{
                fontWeight: '500'
              }}>My Places</Text>
            </CardItem>

            {form
              .state
              .addedPlaces
              .map(place => (
                <CardItem
                  key={place._id}
                  style={{
                  alignSelf: 'center'
                }}>
                  <Card >
                    <CardItem>
                      <Left>
                      <MapView
                        style={{
                        flex: 1,
                        height: 100,
                      }}
                        initialRegion={{
                        latitude: place.lat,
                        longitude: place.lng,
                        latitudeDelta: 0.0032,
                        longitudeDelta: 0.0031
                      }}/>
                      </Left>
                
                      <Text>{place.title + " - "}</Text>
                      <Text>{place.label}</Text>
                     
                    </CardItem>
                  </Card>
                </CardItem>
              ))}

            <CardItem style={{
              alignSelf: 'center'
            }}>
              <Button
                danger
                rounded
                iconLeft
                style={{
                alignSelf: 'center',
                marginBottom: '5%'
              }}
                onPress={this
                ._AddPlacePress
                .bind(this)}>
                <Icon name='md-add-circle'/>
                <Text>Add Place</Text>
              </Button>
            </CardItem>
          </Card>}
      </Content>

    );
  }
}