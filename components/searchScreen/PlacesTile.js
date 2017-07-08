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
      addedPlaces: [],
      inEditMode: false
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

  _EditPlacesPress()
  {
    if (this.state.inEditMode == false) 
      this.setState({inEditMode: true})
    else 
      this.setState({inEditMode: false})
  }

  _DeletePlacePress(id)
  {
    const form = this;
    axios
      .put('http://10.0.0.231:3000/users', {
        updateType: 'deletePlace',
        email: firebaseClient
          .auth()
          .currentUser
          .email,
        id: id
      })
      .then(function (response) {
        // Reset State
        form.setState({addedPlaces: response.data.places})
      })
  }

  componentWillMount()
  {
    const form = this;

    // Fetch all added 'places' from database
    axios
      .get('http://10.0.0.231:3000/users', {

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

            <CardItem header style={{
              paddingBottom: '-10%'
            }}>
              <Text style={{
                fontWeight: '500'
              }}>My Places</Text>
              {form.state.inEditMode
                ? <Button
                    transparent
                    danger
                    style={{
                    marginLeft: '64%'
                  }}
                    onPress={this
                    ._EditPlacesPress
                    .bind(this)}>
                    <Icon name="md-checkmark-circle-outline"/>
                  </Button>
                : <Button
                  transparent
                  danger
                  style={{
                  marginLeft: '64%'
                }}
                  onPress={this
                  ._EditPlacesPress
                  .bind(this)}>
                  <Icon name="md-clipboard"/>
                </Button>}

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
                          marginRight: '25%'
                        }}
                          initialRegion={{
                          latitude: place.lat,
                          longitude: place.lng,
                          latitudeDelta: 0.0032,
                          longitudeDelta: 0.0031
                        }}
                          rotateEnabled={false}
                          scrollEnabled={false}
                          pitchEnabled={false}
                          zoomEnabled={false}/>
                      </Left>

                      <Body>
                        <Text
                          style={{
                          fontWeight: '500',
                          fontSize: 20,
                          marginTop: '12.5%'
                        }}>{place.label}</Text>
                        <Text
                          style={{
                          marginTop: '5%',
                          color: 'grey'
                        }}>{place.title}</Text>
                      </Body>
                      {form.state.inEditMode
                        ? <Button
                            transparent
                            danger
                            style={{
                            marginTop: '10%'
                          }}
                            onPress={() => this._DeletePlacePress(place._id)}>
                            <Icon name="md-trash"/>
                          </Button>
                        : null}
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