import React from 'react';
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
    Text
} from 'native-base';

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA8KXeYsdS00vCCBgFMePwCI2y3inDAe9c",
    authDomain: "glance-e7db8.firebaseapp.com"
}
firebase.initializeApp(firebaseConfig);

@connect((store) => {
    return {user: store.user}
})

export default class LoginForm extends React.Component {

    // Local state used for local components
    constructor(props)
    {
        super(props);
        this.state = {
            nameText: null,
            emailText: null,
            passwordText: null
        }
    }

    _RegisterPress()
    {
        let form = this;

        // Register new user with Firebase
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.emailText, this.state.passwordText)
            .then(function (user) {        
                // Add to Database
                axios.post('http://10.0.0.207:3000/users', {
                    name: form.state.nameText,
                    age: null,
                    email: user.email,})
                    .then(function(response){
                     // Update Redux Store With my Info
                        form
                            .props
                            .dispatch(setUserEmail(form.state.emailText));
                        form
                            .props
                            .dispatch(setUserName(form.state.nameText));

                        // Enter App
                        form
                            .props
                            .navigator
                            .push(form.props.router.getRoute('rootNavigation'));

                        alert("New User Registered");
                }).catch(function (error) {
                    console.log(error);
                });
                
                       
                   
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.errorCode;
                var errorMessage = error.message;

                alert(errorMessage);
            });

    }

    _loginPress()
    {
        let form = this;

        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.emailText, this.state.passwordText)
            .then(function (user) {

              //  alert("Logged in");

                form
                    .props
                    .dispatch(setUserEmail(form.state.emailText));

                form
                    .props
                    .navigator
                    .push(form.props.router.getRoute('rootNavigation'));

            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.errorCode;
                var errorMessage = error.message;

                alert(errorMessage);
            });
    }

    render()
    {
        const {user} = this.props;

        return (
            <Content>

                <Form >
                    <Item floatingLabel>
                        <Label>Full Name</Label>
                        <Input
                            style={{
                            textAlign: 'center'
                        }}
                            onChangeText={(nameText) => this.setState({nameText})}
                            value={this.state.nameText}/>
                    </Item>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            style={{
                            textAlign: 'center'
                        }}
                            keyboardType="email-address"
                            onChangeText={(emailText) => this.setState({emailText})}
                            value={this.state.emailText}/>
                    </Item>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            style={{
                            textAlign: 'center'
                        }}
                            secureTextEntry={true}
                            onChangeText={(passwordText) => this.setState({passwordText})}
                            value={this.state.passwordText}/>
                    </Item>
                </Form>
                <Button
                    dark
                    block
                    style={{
                    marginTop: 100
                }}
                    onPress={this
                    ._loginPress
                    .bind(this)}>
                    <Text>Login</Text>
                </Button >
                <Button
                    dark
                    block
                    style={{
                    marginTop: 20
                }}
                    onPress={this
                    ._RegisterPress
                    .bind(this)}>
                    <Text>Register</Text>
                </Button>

            </Content>
        );

    }
}