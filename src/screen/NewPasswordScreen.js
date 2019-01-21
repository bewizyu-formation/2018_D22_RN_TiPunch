import React, { Component } from 'react';
import { View, Text, TextInput, Button, Picker, Alert, StyleSheet } from 'react-native';
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

            <View style={styles.container}>
                <View style={styles.textContainer} >
                    <Text style={styles.titlePhone} >Nouveau Mot de passe</Text>
                    <TextInput style={styles.input} maxLength={4} value={this.state.newpassword} textContentType="password" placeholder="Nouveau Mot de passe" onChangeText={pass => this.handleChangeNewPassword(pass)} />
                    <Text style={styles.titlePhone} >Confirmer le Mot de passe</Text>
                    <TextInput style={styles.input} maxLength={4} value={this.state.confirmnewpassword} textContentType="password" placeholder="Confirmer le Mot de passe" onChangeText={pass => this.handleChangeConfirmNewPassword(pass)} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button style={styles.button} color={'#9AC221'} onPress={() => this.handleChangePassword()} title="Changer le mot de passe" disabled={!this.state.isPasswordEqual} />
                </View>
                </View>

            </>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CBDE6D',
    },
    textContainer: {
        padding: 20,
    },
    buttonContainer: {
        backgroundColor: '#9AC221',
        paddingVertical: 0
    },

    input: {
        height: 40,
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 10,
        color: 'black'
    },
    button: {
        tintColor: '#9AC221',
        backgroundColor: '#9AC221',
        color: '#9AC221',
        textAlign: 'center',
        fontWeight: '700'
    },
    titlePhone: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
    /*buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }*/
});

