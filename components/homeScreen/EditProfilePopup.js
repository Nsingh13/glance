import React from 'react';
import {View} from 'react-native';
import axios from 'axios';
import {setUserEmail, setUserName, fetchUser} from "../redux/userActions";
import {connect} from "react-redux";

import {
    Content,
    Form,
    Item,
    Input,
    Label,
    Icon,
    Button,
    Text,
    Thumbnail
} from 'native-base';

import PopupDialog, {SlideAnimation} from 'react-native-popup-dialog';

@connect((store) => {
    return {user: store.user}
})

export default class EditProfilePopup extends React.Component {

    // Local state used for local components
    constructor(props)
    {
        super(props);
        this.state = {}
    }

    componentDidMount()
    {
        this
            .popupDialog
            .show();
    }

    _UpdateProfilePress()
    {}

    _CancelPress()
    {}

    render()
    {
        const {user} = this.props;

        return (
            <PopupDialog
                width={'90%'}
                height={'60%'}
                ref={(popupDialog) => {
                this.popupDialog = popupDialog;
            }}
                dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}>
                <Content>
                    <Thumbnail
                        size={80}
                        source={require('../images/blank.png')}
                        style={{
                        marginTop: 30,
                        alignSelf: 'center'
                    }}/>
                    <Form style={{
                        marginTop: 15
                    }}>
                        <Item fixedLabel style={{
                            marginTop: 10
                        }}>
                            <Label>Relationship</Label>
                            <Input />
                        </Item>
                        <Item fixedLabel style={{
                            marginTop: 30
                        }}>
                            <Label>Full Name</Label>
                            <Input />
                        </Item>
                        <Item fixedLabel style={{
                            marginTop: 30
                        }}>
                            <Label>Sex</Label>
                            <Input />
                        </Item>
                        <Item fixedLabel style={{
                            marginTop: 30
                        }}>
                            <Label>Home City</Label>
                            <Input />
                        </Item>
                        <Item fixedLabel style={{
                            marginTop: 30
                        }}>
                            <Label>Birthday</Label>
                            <Input />
                        </Item>
                        <Item fixedLabel style={{
                            marginTop: 30
                        }}>
                            <Label>Short Bio</Label>
                            <Input multiline={true} />
                        </Item>
                    </Form>
                    <Button
                        danger
                        block
                        style={{
                        marginTop: 40
                    }}
                        onPress={this
                        ._UpdateProfilePress
                        .bind(this)}>
                        <Text>Update Profile</Text>
                    </Button >
                    <Button
                        dark
                        block
                        style={{
                        marginTop: 15,
                        marginBottom: 25
                    }}
                        onPress={this
                        ._CancelPress
                        .bind(this)}>
                        <Text>Cancel</Text>
                    </Button >
                </Content>
            </PopupDialog>
        );

    }
}