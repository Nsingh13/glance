import React from 'react';
import {StatusBar, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import {Constants} from 'expo';
import {} from "../redux/userActions";
import {connect} from "react-redux";

import {
    Item,
    Input,
    Icon,
    Button,
    Text,
    Header,
    Thumbnail,
    Picker
} from 'native-base';

import firebaseClient from '../firebaseClient';

import EditProfilePopup from '../rootNavigation/EditProfilePopup';

@connect((store) => {
    return {user: store.user, editProfilePopup: store.editProfilePopup, mainNavigator: store.mainNavigator}
}, null, null)

export default class SearchBar extends React.Component {

    // Local state used for local components
    constructor(props)
    {
        super(props);
        this.state = {
            barText: null
        }
    }

    _openEditProfilePress()
    {
        this
            .props
            .editProfilePopup
            .show();
    }

    _logOutPress()
    {
        const form = this;

        Alert.alert('But I Love You!', 'Are you sure you want to Log Out?', [
            {
                text: 'No',
                onPress: () => console.log('Cancel Pressed')
            }, {
                text: 'Yes',
                onPress: () => 
                {
                    firebaseClient.auth().signOut().then(function(response)
                    {
                        form
                            .props
                            .mainNavigator
                            .pop();
                    })
                }
            }
        ])
    }

    render()
    {
        const form = this;

        return (

            <Header
                searchBar
                rounded
                style={{
                backgroundColor: 'white',
                marginTop: Constants.statusBarHeight
            }}>
                <StatusBar translucent={false} backgroundColor="blue"/>
                <Item>
                    <Icon name="ios-search"/>
                    <Input placeholder="Search"/>
                    <TouchableOpacity
                        onPress={this
                        ._openEditProfilePress
                        .bind(this)}>
                        <Thumbnail
                            small
                            source={form.props.user.profileImage
                            ? {
                                uri: form.props.user.profileImage
                            }
                            : require('../images/blank.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this
                        ._logOutPress
                        .bind(this)}>
                        <Icon name="md-exit"/>
                    </TouchableOpacity>
                </Item>
                <Button transparent>
                    <Text>Search</Text>
                </Button>
            </Header>
        );

    }
}