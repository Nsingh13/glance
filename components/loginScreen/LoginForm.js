import React from 'react';
import axios from 'axios';

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

import firebaseClient from '../firebaseClient';

export default class LoginForm extends React.Component {

    // Local state used for local components
    constructor(props)
    {
        super(props);
        this.state = {
            emailText: '13.navjot.singh@gmail.com',
            passwordText: '131313'
        }
    }

    _RegisterPress()
    {
        let form = this;
    
        // Register new user with Firebase
        firebaseClient
            .auth()
            .createUserWithEmailAndPassword(this.state.emailText, this.state.passwordText)
            .then(function (user) {
                // Add to Database
                axios
                    .post('http://10.0.0.231:3000/users', {email: user.email})
                    .then(function (response) {

                        // Enter App
                        form
                            .props
                            .navigator
                            .push(form.props.router.getRoute('rootNavigation'));
                            
                        alert("New User Registered: " + response.data.email);
                    })
                    .catch(function (error) {
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

        firebaseClient
           .auth()
            .signInWithEmailAndPassword(this.state.emailText, this.state.passwordText)
            .then(function (user) {

                //  alert("Logged in");

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