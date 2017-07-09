import React from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
import axios from 'axios';

import {StackNavigation} from '@expo/ex-navigation';
import Router from '../navigation/Router';

export default class PlaceScreen extends React.Component {

    static route = {
        navigationBar: {
            visible: false
        }

    }

    constructor(props) {
        super(props);
        // Set State
        this.state = {
            users: ['test']
        }
    }

    componentWillMount()
    {
        const form = this;
        // Fetch all users who have same place added (lat, lng)
        axios
            .get('http://10.0.0.231:3000/users', {

                params: {
                    getType: 'usersWithSamePlace',
                    lat: form.props.route.params.lat,
                    lng: form.props.route.params.lng
                }

            })
            .then(function (response) {
                form.setState({users: response.data})
            })
    }

    render() {

        const form = this;

        return (

            <View>
                <Text> {form.state.users} </Text>
            </View>

        );

    }

}
