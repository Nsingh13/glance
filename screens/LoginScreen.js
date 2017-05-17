import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';

import {StackNavigation} from '@expo/ex-navigation';
import Router from '../navigation/Router';

import {Container, Grid, Row, Col} from 'native-base';

import LoginForm from '../components/loginScreen/LoginForm';

export default class LoginScreen extends React.Component {

    static route = {
        navigationBar: {
            visible: false
        }

    }

    render() {

        return (

            <Container>
                <Grid>
                    <Row size={15}></Row>
                    <Row size={85}>
                        <Col size={5}></Col>
                        <Col size={90}>
                            <LoginForm
                                navigator={this.props.navigator}
                                router={Router}/>
                        </Col>
                        <Col size={5}></Col>
                    </Row>
                </Grid>
            </Container>

        );

    }

}
