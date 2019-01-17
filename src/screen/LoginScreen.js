import React, { Component } from 'react';
import {
  View, Text, TextInput, Button,
} from 'react-native';
import { login } from '../api/APIClient';

export default class Login extends Component {
    static navigationOptions = {
      title: 'Connexion',
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
      this.state = { tel: '', password: '', loginList: [] };

      this.handleChangeTel = this.handleChangeTel.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this)
      this.connexion = this.connexion.bind(this)
    }

    handleChangeTel(tel) {
      this.setState({ tel });
    }

    handleChangePassword(pass) {
      this.setState({ password: pass });
    }

    connexion() {
      login(this.state.tel, this.state.password, (data) => {
        this.props.navigation.navigate('ContactList')
      });
    }

    render() {
      return (
        <>
          <View>
            <Text>N° de téléphone</Text>
            <TextInput value={this.state.tel} textContentType="telephoneNumber" placeholder="N° de tél" onChangeText={tel => this.handleChangeTel(tel)} />
          </View>
          <View>
            <Text>Mot de passe</Text>
            <TextInput value={this.state.password} textContentType="password" placeholder="password" onChangeText={pass => this.handleChangePassword(pass)} />
          </View>
          <Button onPress={() => this.connexion()} title="Se connecter" />
          <Button onPress={()=> {}} title="S'inscrire" />
        </>
      );
    }
}
