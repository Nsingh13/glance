import React from 'react';
import {Platform, View, TouchableOpacity, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {MapView, Constants, Location, Permissions} from 'expo';

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
    Form
} from 'native-base';

export default class MapScreen extends React.Component {

    static route = {
        navigationBar: {
            visible: false
        }

    }

    constructor(props) {
        super(props);
        // Set State
        this.state = {
            location: null
        }
    }

    _getLocationAsync = async() => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            // do something?
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({location});
    };

    _goBackPress()
    {
        // Go Back
        this
            .props
            .navigator
            .pop();
    }

    componentWillMount()
    {
        if (Platform.OS === 'android' && !Constants.isDevice) {

            alert('Oops, this will not work on Sketch in an Android emulator. Try it on your device' +
                    '!');

        } else {
            this._getLocationAsync();
        }
    }

    render() {
        const form = this;

        if (form.state.location != null) {
            return (
                <Container>
                    <MapView
                        style={styles.map}
                        customMapStyle={darkMapStyle}
                        initialRegion={{
                        latitude: form.state.location.coords.latitude,
                        longitude: form.state.location.coords.longitude,
                        latitudeDelta: 0.0032,
                        longitudeDelta: 0.0031
                    }}/>
                    <Button
                        danger
                        rounded
                        style={{
                        marginTop: Constants.statusBarHeight + 20,
                        alignSelf: 'center'
                    }}
                        onPress={this
                        ._goBackPress
                        .bind(this)}>
                        <Text>Cancel</Text>
                    </Button>

                    <Form style={{
                        marginTop: '3%'
                    }}>
                        <View
                            style={{
                            paddingHorizontal: '5%'
                        }}>
                            <Item rounded style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', borderColor: 'black'}}>
                                <Icon active name='home' />
                                <Input
                                    placeholder='Enter Name or Address'
                                    style={{
                                    height: 40,
                                    fontSize: 22,
                                    textAlign: 'center'
                                }}/>
                            </Item>
                        </View>
                        <View
                            style={{
                            paddingHorizontal: '20%'
                        }}>
                            <Item rounded style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', borderColor: 'black'}}>
                                <Input
                                    placeholder='Label (e.g. Work, School, etc.)'
                                    style={{
                                    height: 35,
                                    fontSize: 14,
                                    textAlign: 'center'
                                }}/>
                            </Item>
                        </View>
                    </Form>

                    <Button
                        danger
                        rounded
                        style={{
                        marginTop: '80%',
                        marginLeft: '70%'
                    }}>
                        <Icon name='md-navigate'/>
                    </Button>

                </Container>
            );
        } else {
            return (
                <View></View>
            );
        }
    }

    
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
    }
});

const darkMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]