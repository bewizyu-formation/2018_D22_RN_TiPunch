import React, { Component } from 'react';
import {
  View, Text, TextInput, Button, Picker, Alert
} from 'react-native';
import {signUp} from '../api/APIClient'

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
      this.state = {
        phone: '', password: '', lastname: '', firstname: '', profile: 'senior', email: '',
      };

      this.handleChangePhone = this.handleChangePhone.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
      this.handleChangeLastname = this.handleChangeLastname.bind(this);
      this.handleChangeemail = this.handleChangeemail.bind(this);

      this.signUpInServer = this.signUpInServer.bind(this);
    }

    signUpInServer(){
      signUp(this.state.phone, this.state.password, this.state.firstname, this.state.lastname, this.state.email, this.state.profile.toUpperCase(), (data) =>{
        if(data.message){
          console.log(data.message);
          Alert.alert(
            'Inscription invalide',
            data.message,
            [
              { text: 'OK' },
            ],
            { cancelable: false },
          );
        }
        else {
          data.password = this.state.password
          this.props.navigation.navigate('Login', {user: data})
        }
      })
    }

    handleChangePhone(phone) {
      this.setState({ phone });
    }

    handleChangePassword(pass) {
      this.setState({ password: pass });
    }

    handleChangeFirstname(firstname) {
      this.setState({ firstname });
    }

    handleChangeLastname(lastname) {
      this.setState({ lastname });
    }

    handleChangeemail(email) {
      this.setState({ email });
    }

    render() {
      return (
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
            <Picker selectedValue={this.state.profile} 
            onValueChange={(itemValue) => this.setState({ profile: itemValue })}>
              <Picker.Item label="Senior" value="senior" />
              <Picker.Item label="Médecin" value="medecin" />
              <Picker.Item label="Famille" value="famille" />
            </Picker>
          </View>
          <View>
            <Text>Email</Text>
            <TextInput value={this.state.email} textContentType="emailAddress" placeholder="e-email" onChangeText={email => this.handleChangeemail(email)} />
          </View>
          <Button onPress={()=> this.signUpInServer()} title="S'inscrire" />
        </>
      );
    }
}
