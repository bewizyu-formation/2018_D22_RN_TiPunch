import React, { Component } from 'react';
import {
  View, Text, TextInput, Button
} from 'react-native';
import { login } from '../api/APIClient';

export default class LoginScreen extends Component {
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
      this.state = { tel: '', password: '', loginList: [], isConnect: true};

      this.handleChangeTel = this.handleChangeTel.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.connexion = this.connexion.bind(this);
    }

    handleChangeTel(tel) {
      this.setState({ tel });
      this.state = { phone: '', password: ''};

      this.handleChangePhone = this.handleChangePhone.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this)
      this.connexion = this.connexion.bind(this)
      this.signUp= this.signUp.bind(this)
    }

    componentDidUpdate(){
      const { navigation } = this.props;
      let user = navigation.getParam('user', null);
      if(user){
        if(this.state.phone !== user.phone){
          this.setState({ phone: user.phone, password: user.password});
        }
      }
    }

    handleChangePhone(phone) {
      this.setState({ phone });
    }

    handleChangePassword(pass) {
      this.setState({ password: pass });
    }

    connexion() {
      login(this.state.phone, this.state.password, (data) => {
        this.props.navigation.navigate('ContactList')
      });
    }

    signUp(){
      this.props.navigation.navigate('SignUp')
    }

    render() {
      return (
        <>
          <View>
            <Text>N° de téléphone</Text>
            <TextInput value={this.state.phone} textContentType="telephoneNumber" placeholder="N° de tél" onChangeText={phone => this.handleChangePhone(phone)} />
          </View>
          <View>
            <Text>Mot de passe</Text>
            <TextInput value={this.state.password} textContentType="password" placeholder="password" onChangeText={pass => this.handleChangePassword(pass)} />
          </View>
          <Button onPress={() => this.connexion()} title="Se connecter" />
          <Button onPress={()=> this.signUp()} title="S'inscrire" />
        </>
      );
    }
}
