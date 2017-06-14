import React from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
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
    return {user: store.user, editProfilePopup: store.editProfilePopup}
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
      this.props.editProfilePopup.show();
    }

    _logOutPress()
    {}

    render()
    {
        const {user} = this.props;

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
                        <Thumbnail small source={require('../images/blank.png')}/>
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