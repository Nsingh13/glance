import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {setUserEmail, setUserName, fetchUser} from "../redux/userActions";
import {connect} from "react-redux";
import {ImagePicker} from 'expo';
import DatePicker from 'react-native-datepicker';

const pItem = Picker.Item;
const showAnimation = true;
const currentDate = new Date();

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
            image: null,
            date: null
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

    _PickImagePress = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 4]
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({image: result.uri});
        }
    };

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
                    <TouchableOpacity onPress={this._PickImagePress}>
                        <Thumbnail
                            large
                            source={this.state.image != null
                            ? {
                                uri: this.state.image
                            }
                            : require('../images/blank.png')}
                            style={{
                            marginTop: 30,
                            alignSelf: 'center'
                        }}/>
                    </TouchableOpacity>
                    <Form style={{
                        marginTop: 15
                    }}>
                        <Picker
                            style={{
                            marginLeft: 10
                        }}
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
                            marginTop: 15
                        }}>
                            <Label
                                style={{
                                marginTop: 10
                            }}>Sex</Label>
                            <Text>Male</Text>
                            <Radio
                                style={{
                                marginLeft: 5
                            }}
                                selected={this.state.selectedSex === 'Male'
                                ? true
                                : false}
                                onPress={(selectedSex) => this.setState({selectedSex: 'Male'})}/>
                            <Text
                                style={{
                                marginLeft: 10
                            }}>Female</Text>
                            <Radio
                                style={{
                                marginLeft: 5
                            }}
                                selected={this.state.selectedSex === 'Female'
                                ? true
                                : false}
                                onPress={(selectedSex) => this.setState({selectedSex: 'Female'})}/>
                            <Text
                                style={{
                                marginLeft: 10
                            }}>Other</Text>
                            <Radio
                                style={{
                                marginLeft: 5,
                                marginRight: 15
                            }}
                                selected={this.state.selectedSex === 'Other'
                                ? true
                                : false}
                                onPress={(selectedSex) => this.setState({selectedSex: 'Other'})}/>
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
                            <Label>Phone # (Not Public)</Label>
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
                            <Label style={{marginTop: 30}}>Birthday</Label>
                            <DatePicker
                                style={{
                                width: 200,
                                marginRight: 10
                            }}
                                date={this.state.date}
                                mode="date"
                                placeholder="Select Date"
                                format="YYYY-MM-DD"
                                minDate="1900-01-01"
                                maxDate="2100-01-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                dateInput: {
                                  //  marginLeft: 36
                                 
                                }, // ... You can check the source to find the other keys. }}
                                dateTouchBody: {
                                }
                                }}
                                onDateChange={(date) => {
                                this.setState({date: date})
                            }}/>
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