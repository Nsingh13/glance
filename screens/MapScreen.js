import React from 'react';
import {Platform, View, TouchableOpacity, StyleSheet, KeyboardAvoidingView} from 'react-native';
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
    Form
} from 'native-base';

import firebaseClient from '../components/firebaseClient';

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
            location: null,
            markerLocation: null,
            addressText: null,
            labelText: null
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

    _onNavigatePress()
    {
        const form = this;

        // Call Google Maps Geocoding API
        if (form.state.addressText != null) {
            axios
                .get("https://maps.googleapis.com/maps/api/geocode/json?address=" + form.state.addressText + "&key=AIzaSyDmkJxMoINa_SXYvqHfqmAt-p6a0ckULEY")
                .then(response => {
                    const results = response.data.results;
                    if (results[0]) {
                        // Navigate There
                        form
                            .map
                            .animateToRegion({
                                latitude: results[0].geometry.location.lat + 0.0003,
                                longitude: results[0].geometry.location.lng,
                                latitudeDelta: 0.0032,
                                longitudeDelta: 0.0031
                            }, 1006);

                        form.setState({
                            markerLocation: {
                                latitude: results[0].geometry.location.lat,
                                longitude: results[0].geometry.location.lng
                            }
                        })
                    }
                })
                .catch(error => {
                    alert(error);
                });
        }
    }

    _addPlacePress()
    {
        const form = this;

        if (this.state.addressText == null || this.state.labelText == null) {
            alert("Please enter both Name/Address and Label");
        } else if (this.state.markerLocation == null) {
            alert("Please choose valid location");
        } else {
            // Save to Database
            axios
                .put('http://10.0.0.231:3000/users', {
                    updateType: 'addPlace',
                    email: firebaseClient
                        .auth()
                        .currentUser
                        .email,
                    placeTitle: form.state.addressText,
                    placeLabel: form.state.labelText,
                    lat: form.state.markerLocation.latitude,
                    lng: form.state.markerLocation.longitude
                })
                .then(function (response) {
                    // Go back
                    form.props.route.params.reMount();
                    form
                        .props
                        .navigator
                        .pop();
                })
        }
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
                        ref={ref => this.map = ref}
                        initialRegion={{
                        latitude: form.state.location.coords.latitude + 0.0003,
                        longitude: form.state.location.coords.longitude,
                        latitudeDelta: 0.0032,
                        longitudeDelta: 0.0031
                    }}>
                        {form.state.markerLocation == null
                            ? <MapView.Marker
                                    coordinate={{
                                    latitude: form.state.location.coords.latitude,
                                    longitude: form.state.location.coords.longitude
                                }}
                                    title="Current Location"
                                    pinColor="#d9534f"
                                    flat={true}
                                    onPress={(data) => {
                                    var coord = data.nativeEvent.coordinate;
                                    coord.latitude += 0.0003;
                                    form
                                        .map
                                        .animateToRegion({
                                            latitude: coord.latitude,
                                            longitude: coord.longitude,
                                            latitudeDelta: 0.0032,
                                            longitudeDelta: 0.0031
                                        }, 600);
                                }}/>
                            : <MapView.Marker
                                coordinate={form.state.markerLocation}
                                title="0 People"
                                pinColor="#d9534f"
                                onPress={(data) => {
                                var coord = data.nativeEvent.coordinate;
                                coord.latitude += 0.0003;
                                form
                                    .map
                                    .animateToRegion({
                                        latitude: coord.latitude,
                                        longitude: coord.longitude,
                                        latitudeDelta: 0.0032,
                                        longitudeDelta: 0.0031
                                    }, 600);
                            }}/>}
                    </MapView>
                    <Button
                        dark
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
                            <Item
                                rounded
                                style={{
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                                borderColor: 'lightgrey'
                            }}>
                                <Icon active name='home'/>
                                <Input
                                    autoCorrect={false}
                                    placeholder='Enter Name or Address'
                                    style={{
                                    height: 35,
                                    fontSize: 22,
                                    textAlign: 'center'
                                }}
                                    onChangeText={(addressText) => this.setState({addressText})}
                                    value={this.state.addressText}/>
                            </Item>
                        </View>
                        <View
                            style={{
                            paddingHorizontal: '23%'
                        }}>
                            <Item
                                rounded
                                style={{
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                                borderColor: 'lightgrey'
                            }}>
                                <Input
                                    placeholder='Label (Work, School, etc.)'
                                    style={{
                                    height: 30,
                                    fontSize: 14,
                                    textAlign: 'center'
                                }}
                                    onChangeText={(labelText) => this.setState({labelText})}
                                    value={this.state.labelText}/>
                            </Item>
                        </View>
                    </Form>

                    <Button
                        danger
                        rounded
                        style={{
                        marginTop: '65%',
                        marginLeft: '70%'
                    }}
                        onPress={this
                        ._addPlacePress
                        .bind(this)}>
                        <Icon name='md-add'/>
                    </Button>
                    <Button
                        dark
                        rounded
                        style={{
                        marginTop: '5%',
                        marginLeft: '70%'
                    }}
                        onPress={this
                        ._onNavigatePress
                        .bind(this)}>
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
    }, {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }, {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    }, {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    }, {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    }, {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    }, {
        "featureType": "administrative.land_parcel",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }, {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    }, {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#181818"
            }
        ]
    }, {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    }, {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1b1b1b"
            }
        ]
    }, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#2c2c2c"
            }
        ]
    }, {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8a8a8a"
            }
        ]
    }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#373737"
            }
        ]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3c3c3c"
            }
        ]
    }, {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#4e4e4e"
            }
        ]
    }, {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    }, {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    }, {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3d3d3d"
            }
        ]
    }
]