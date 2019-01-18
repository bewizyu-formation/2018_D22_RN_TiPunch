import React, { Component } from 'react';
import { View, Text, TextInput, Button, Picker, Alert } from 'react-native';
//import {login} from '../api/APIClient';

export default class NewPasswordScreen extends Component {
    static navigationOptions = {
        title: 'Nouveau Mot de Passe',
        headerStyle: {
            backgroundColor: '#628B35',
        },
        headerTintColor: '#E2E3E7',
        headerTitleStyle: {
            fontWeight: '500',
        },
    }
    constructor(props) {
        super(props);
        this.state = {
            newpassword: '',
            confirmnewpassword: '',
            isPasswordEqual: false
        };
        this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this)
        this.handleChangeConfirmNewPassword = this.handleChangeConfirmNewPassword.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleChangeNewPassword(pass) {
        this.setState({ 
            newpassword: pass,
        });
    }

    componentDidUpdate() {
    };

    handleChangeConfirmNewPassword(pass) {
        this.setState({ 
            confirmnewpassword: pass ,
            isPasswordEqual:(pass===this.state.newpassword)

        });
    }
    handleChangePassword() {
        //TODO Connect to API Forgot Password
    }

    render() {
        return (
            <>
                <View>
                    <Text>Nouveau Mot de passe</Text>
                    <TextInput value={this.state.newpassword} textContentType="password" placeholder="Nouveau Mot de passe" onChangeText={pass => this.handleChangeNewPassword(pass)} />
                    <Text>Confirmer le Mot de passe</Text>
                    <TextInput value={this.state.confirmnewpassword} textContentType="password" placeholder="Confirmer le Mot de passe" onChangeText={pass => this.handleChangeConfirmNewPassword(pass)} />
                </View>
                <View>
                </View>
                <Button onPress={() => this.handleChangePassword()} title="Changer le mot de passe" disabled={!this.state.isPasswordEqual} />
            </>
        );
    }
};
