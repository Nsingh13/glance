import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {
    fetchEditProfilePopup,
    setUserName,
    setUserImage,
    setUserEmail,
    setUserBirthday,
    setUserRelationshipStatus,
    setUserSex,
    setUserLocation,
    setUserBio
} from "../redux/userActions";
import {connect} from "react-redux";
import {ImagePicker} from 'expo';
import DatePicker from 'react-native-datepicker';

const pItem = Picker.Item;
const showAnimation = true;
const currentDate = new Date();

let updateCount = 0;

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

import firebaseClient from '../firebaseClient';

@connect((store) => {
    return {user: store.user}
}, null, null)

export default class EditProfilePopup extends React.Component {

    // Local state used for local components
    constructor(props)
    {
        super(props);
        this.state = {
            selectedRelationship: 'Single',
            selectedSex: 'None',
            image: null,
            birthday: null,
            nameText: null,
            locationText: null,
            bioText: null
        }
    }

    componentWillMount()
    {
        let form = this;

        // Retrieve info from DB
        axios
            .get('http://10.0.0.207:3000/users', {

                params: {
                    email: firebaseClient
                        .auth()
                        .currentUser
                        .email
                }

            })
            .then(function (response) {

                form.setState({
                    selectedRelationship: response.data.relationshipStatus,
                    selectedSex: response.data.sex,
                    birthday: response.data.birthday,
                    nameText: response.data.name,
                    locationText: response.data.location,
                    bioText: response.data.bio
                }, () => {
                                     // Send state info to Redux
        form
            .props
            .dispatch(setUserEmail(firebaseClient.auth().currentUser.email));

        form
            .props
            .dispatch(setUserName(form.state.nameText));

        form
            .props
            .dispatch(setUserBirthday(form.state.birthday));

        form
            .props
            .dispatch(setUserRelationshipStatus(form.state.selectedRelationship));

        form
            .props
            .dispatch(setUserSex(form.state.selectedSex));

        form
            .props
            .dispatch(setUserLocation(form.state.locationText));

        form
            .props
            .dispatch(setUserBio(form.state.bioText));

        form
            .props
            .dispatch(setUserImage(form.state.image));

                   // showAnimation = false;

                });
            })
            .catch((err) => {
                alert(err)
            });
    }

    componentDidMount()
    {
        // Send this popup to Redux to we can access from anywhere
        this
            .props
            .dispatch(fetchEditProfilePopup(this.popupDialog));

    }

    componentWillUpdate()
    {
        if (updateCount < 2)
        updateCount++;
        else
        showAnimation = false;
    }

    componentDidUpdate(prevProps, prevState)
    {
        this
            .popupDialog
            .show();
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
    {
        const form = this;

        if (this.state.selectedSex == null || this.state.birthday == null || this.state.nameText == null) {
            alert("Cannot Update. Minimum Requirements: Sex, Name, Birthday.");
        } else {

            // Only Update If Anything Changed.. Otherwise Simply Dismiss
            if (form.state.nameText != form.props.user.name || form.state.birthday != form.props.user.birthday || form.state.selectedRelationship != form.props.user.relationshipStatus || form.state.selectedSex != form.props.user.sex || form.state.locationText != form.props.user.location || form.state.bioText != form.props.user.bio || form.state.image != form.props.user.profileImage) {
                // TODO: Store Image to s3 Bucket Add Other Info to Database
                axios
                    .put('http://10.0.0.207:3000/users', {

                        email: firebaseClient
                            .auth()
                            .currentUser
                            .email,
                        name: form.state.nameText,
                        birthday: form.state.birthday,
                        relationshipStatus: form.state.selectedRelationship,
                        sex: form.state.selectedSex,
                        location: form.state.locationText,
                        bio: form.state.bioText

                    })
                    .then(function (response) {
                        // Update Redux Store With Only Info Shared Between Components (so we won't have
                        // to read from DB again)
                        form
                            .props
                            .dispatch(setUserEmail(firebaseClient.auth().currentUser.email));

                        form
                            .props
                            .dispatch(setUserName(form.state.nameText));

                        form
                            .props
                            .dispatch(setUserBirthday(form.state.birthday));

                        form
                            .props
                            .dispatch(setUserRelationshipStatus(form.state.selectedRelationship));

                        form
                            .props
                            .dispatch(setUserSex(form.state.selectedSex));

                        form
                            .props
                            .dispatch(setUserLocation(form.state.locationText));

                        form
                            .props
                            .dispatch(setUserBio(form.state.bioText));

                        form
                            .props
                            .dispatch(setUserImage(form.state.image));

                        // Close Popup
                        form
                            .popupDialog
                            .dismiss();

                    })
                    .catch(function (error) {
                        alert(error);
                    });
            } else {
                // Close Popup
                form
                    .popupDialog
                    .dismiss();
            }

        }
    }

    _CancelPress()
    {
        // TODO: Auto-scroll back to top

        if (this.state.selectedSex == null || this.state.birthday == null || this.state.nameText == null) 
            alert("Cannot Cancel. Minimum Requirements: Sex, Name, Birthday.");
        else {

            if (this.state.nameText != this.props.user.name || this.state.birthday != this.props.user.birthday || this.state.selectedRelationship != this.props.user.relationshipStatus || this.state.selectedSex != this.props.user.sex || this.state.locationText != this.props.user.location || this.state.bioText != this.props.user.bio || this.state.image != this.props.user.profileImage) {
                this.setState({
                    nameText: this.props.user.name,
                    birthday: this.props.user.birthday,
                    selectedRelationship: this.props.user.relationshipStatus,
                    selectedSex: this.props.user.sex,
                    locationText: this.props.user.location,
                    bioText: this.props.user.bio,
                    image: this.props.user.profileImage
                }, () => {this
                .popupDialog
                .dismiss();});
                }
            else
            {
                this
                .popupDialog
                .dismiss();
            }
            }
        }
    

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
                            <pItem label="Single" value="Single"/>
                            <pItem label="In a Relationship" value="In a Relationship"/>
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
                            <Input
                                onChangeText={(nameText) => this.setState({nameText})}
                                value={this.state.nameText}/>
                        </Item>

                        <Item
                            fixedLabel
                            style={{
                            marginTop: 30
                        }}>
                            <Label>Location</Label>
                            <Input
                                onChangeText={(locationText) => this.setState({locationText})}
                                value={this.state.locationText}/>
                        </Item>
                        <Item
                            fixedLabel
                            style={{
                            marginTop: 30
                        }}>
                            <Label
                                style={{
                                marginTop: 30
                            }}>Birthday</Label>
                            <DatePicker
                                style={{
                                width: 200,
                                marginRight: 10
                            }}
                                date={this.state.birthday}
                                mode="date"
                                placeholder="Select Date"
                                format="YYYY-MM-DD"
                                minDate="1900-01-01"
                                maxDate="2100-01-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                dateInput: { // marginLeft: 36 }, // ... You can check the source to find the other keys. }}
                                } }} onDateChange={(birthday) => {
                                this.setState({birthday: birthday})
                            }}/>
                        </Item>
                        <Item
                            fixedLabel
                            style={{
                            marginTop: 30
                        }}>
                            <Label>Short Bio</Label>
                            <Input
                                multiline={true}
                                onChangeText={(bioText) => this.setState({bioText})}
                                value={this.state.bioText}/>
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