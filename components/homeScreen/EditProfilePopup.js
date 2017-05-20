import React from 'react';
import {View} from 'react-native';
import axios from 'axios';
import {setUserEmail, setUserName, fetchUser} from "../redux/userActions";
import {connect} from "react-redux";
import {ImagePicker} from 'expo';
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
    Picker,
    Radio
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
            selectedSex: 'None',
            orientation: 'None'
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
                dialogAnimation={showAnimation
                ? new SlideAnimation({slideFrom: 'bottom'})
                : new DefaultAnimation({toValue: 0, animationDuration: 0})}>
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
                            style={{marginLeft: 10}}
                            supportedOrientations={['portrait']}
                            iosHeader="Select Relationship"
                            mode="dropdown"
                            onValueChange={(selectedRelationship) => this.setState({selectedRelationship})}
                            selectedValue={this.state.selectedRelationship}>
                            <pItem label="Single" value="key0"/>
                            <pItem label="In a Relationship" value="key1"/>
                        </Picker>
                        <Item
                        underline={false}
                            fixedLabel
                            style={{
                            marginTop: 15
                        }}>
                            <Label style={{marginTop: 10}}>Sex</Label>
                            <Text>Male</Text>
                            <Radio style={{marginLeft: 5}} selected={this.state.selectedSex === 'Male' ? true: false}  onPress={(selectedSex) => this.setState({selectedSex: 'Male'})}/>
                            <Text style={{marginLeft: 10}}>Female</Text>
                            <Radio style={{marginLeft: 5}} selected={this.state.selectedSex === 'Female' ? true: false} onPress={(selectedSex) => this.setState({selectedSex: 'Female'})}/>
                            <Text style={{marginLeft: 10}}>Other</Text>
                            <Radio style={{marginLeft: 5, marginRight: 10}} selected={this.state.selectedSex === 'Other' ? true: false} onPress={(selectedSex) => this.setState({selectedSex: 'Other'})}/>
                        </Item>
                        <Item
                        underline={false}
                            fixedLabel
                            style={{
                            marginTop: 30
                        }}>
                            <Label style={{marginTop: 10}}>Orientation</Label>
                            <Text>Straight</Text>
                            <Radio style={{marginLeft: 5}} selected={this.state.orientation === 'Straight' ? true: false}  onPress={(orientation) => this.setState({orientation: 'Straight'})}/>
                            <Text style={{marginLeft: 10}}>Gay</Text>
                            <Radio style={{marginLeft: 5}} selected={this.state.orientation === 'Gay' ? true: false} onPress={(orientation) => this.setState({orientation: 'Gay'})}/>
                            <Text style={{marginLeft: 10}}>Bi</Text>
                            <Radio style={{marginLeft: 5, marginRight: 10}} selected={this.state.orientation === 'Bi' ? true: false} onPress={(orientation) => this.setState({orientation: 'Bi'})}/>
                        </Item>
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
                            <Label>Location</Label>
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