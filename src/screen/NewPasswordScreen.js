import React, { Component } from 'react';
import { View, Text, TextInput, Button, Picker, Alert } from 'react-native';

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
    }

    handleChangeNewPassword(pass) {
        this.setState({ 
            newpassword: pass,
            isPasswordEqual:(pass===this.state.confirmnewpassword)
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
      //TODO Apply Change to UserProfile
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
