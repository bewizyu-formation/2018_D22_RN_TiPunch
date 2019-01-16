import React, { Component } from 'react';
import {
  View, Text, TextInput, Button, Picker
} from 'react-native';

export default class SignUp extends Component {
    static navigationOptions = {
        title: 'Inscription',
        headerStyle: {
          backgroundColor: '#628B35',
        },
        headerTintColor: '#E2E3E7',
        headerTitleStyle: {
          fontWeight: '500',
        },
    };

    constructor(props) {
        super(props);
        this.state = {phone: '', password: '', lastname: '', firstname: '', profile: 'senior', mail: ''};

        this.handleChangePhone = this.handleChangePhone.bind(this);
    }

    handleChangePhone(phone) {
        this.setState({ phone });
    }
    handleChangePassword(pass) {
        this.setState({ password : pass });
    }
    handleChangeFirstname(firstname) {
        this.setState({ firstname });
    }
    handleChangeLastname(lastname) {
        this.setState({ lastname });
    }
    handleChangeMail(mail){
        this.setState({ mail });
    }

    render(){
        return(
            <>
                <View>
                    <Text>N° de téléphone</Text>
                    <TextInput value={this.state.phone} textContentType="telephoneNumber" placeholder="N° de tél" onChangeText={phone => this.handleChangePhone(phone)} />
                </View>
                <View>
                    <Text>Prénom</Text>
                    <TextInput value={this.state.firstname} textContentType="name" placeholder="prénom" onChangeText={firstname => this.handleChangeFirstname(firstname)} />
                </View>
                <View>
                    <Text>Nom</Text>
                    <TextInput value={this.state.lastname} textContentType="name" placeholder="nom" onChangeText={lastname => this.handleChangeLastname(lastname)} />
                </View>
                <View>
                    <Text>Mot de passe</Text>
                    <TextInput value={this.state.password} textContentType="password" placeholder="mot de passe" onChangeText={pass => this.handleChangePassword(pass)} />
                </View>
                <View>
                    <Text>Type de profil</Text>
                    <Picker selectedValue={this.state.profile} onValueChange={(itemValue, itemIndex) => this.setState({profile: itemValue})}>
                        <Picker.Item label="Senior" value="senior" />
                        <Picker.Item label="Médecin" value="medecin" />
                        <Picker.Item label="Famille" value="famille" />
                    </Picker>
                </View>
                <View>
                    <Text>Email</Text>
                    <TextInput value={this.state.mail} textContentType='emailAddress' placeholder="e-mail" onChangeText={mail => this.handleChangeMail(mail)} />
                </View>
                <Button onPress={() => console.log('Num: ' + this.state.phone + ' Name: ' + this.state.firstname + ' Lastname: ' + this.state.lastname + ' Password: ' + this.state.password + ' Profil: ' + this.state.profile+ ' Mail: ' + this.state.mail)} title="S'inscrire"/>
                <Button onPress={() => console.log('go connexion')} title="Se connecter" />
            </>
        )
    }
}