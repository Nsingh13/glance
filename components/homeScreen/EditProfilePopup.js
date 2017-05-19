import React from 'react';
import {View} from 'react-native';
import axios from 'axios';
import {setUserEmail, setUserName, fetchUser} from "../redux/userActions";
import {connect} from "react-redux";
const pItem = Picker.Item;
const showAnimation = true;

import {
    Content,
    Form,
    Item,
    Input,
    Label,
    Icon,
    Button,
    Text,
    Thumbnail,
    Picker
} from 'native-base';

import PopupDialog, {SlideAnimation, DefaultAnimation, ScaleAnimation} from 'react-native-popup-dialog';

@connect((store) => {
    return {user: store.user}
})

export default class EditProfilePopup extends React.Component {

    // Local state used for local components
    constructor(props)
    {
        super(props);
        this.state = {
            selectedRelationship: 'key0',
        }
    }

    componentDidMount()
    {
        this
            .popupDialog
            .show();
    }

    componentDidUpdate(prevProps, prevState)
    {
        this
            .popupDialog
            .show();
    }

    componentWillUpdate(nextProps, nextState)
    {
      showAnimation = false;
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
                dismissOnTouchOutside={false}
                dismissOnHardwareBackPress={false}
                ref={(popupDialog) => {
                this.popupDialog = popupDialog;
            }}
                dialogAnimation={showAnimation ? new SlideAnimation({slideFrom: 'bottom'}): new DefaultAnimation({toValue: 0, animationDuration: 0})}
                > 
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

                        <Picker
                            supportedOrientations={['portrait']}
                            iosHeader="Select Relationship"
                            mode="dropdown"
                            onValueChange={(selectedRelationship) => this.setState({selectedRelationship})}
                            selectedValue={this.state.selectedRelationship}>
                            <pItem label="Single" value="key0"/>
                            <pItem label="In a Relationship" value="key1"/>
                        </Picker>

                        <Item
                            fixedLabel
                            style={{
                            marginTop: 30
                        }}>
                            <Label>Full Name</Label>
                            <Input/>
                        </Item>
                        <Item
                            fixedLabel
                            style={{
                            marginTop: 30
                        }}>
                            <Label>Sex</Label>
                            <Input/>
                        </Item>
                        <Item
                            fixedLabel
                            style={{
                            marginTop: 30
                        }}>
                            <Label>Home City</Label>
                            <Input/>
                        </Item>
                        <Item
                            fixedLabel
                            style={{
                            marginTop: 30
                        }}>
                            <Label>Birthday</Label>
                            <Input/>
                        </Item>
                        <Item
                            fixedLabel
                            style={{
                            marginTop: 30
                        }}>
                            <Label>Short Bio</Label>
                            <Input multiline={true}/>
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