import React, { Component } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Image, KeyboardAvoidingView, ScrollView,
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
    this.state = {
      tel: '',
      password: '',
      loginList: [],
      isConnect: true,
      isUserSetInfo: false,
      borderColor: 'red'
    };
    this.handleChangeTel = this.handleChangeTel.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.connexion = this.connexion.bind(this);
  }

  handleChangeTel(tel) {
    this.setState({ tel });
    this.state = { phone: '', password: '' };

    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.connexion = this.connexion.bind(this)
    this.signUp = this.signUp.bind(this)
  }


  handleChangePhone(phone) {
    this.setState({
      phone,
    });
  }

  handleChangePassword(pass) {
    this.setState({
      password: pass,
      isUserSetInfo: (pass.length == 4 && this.state.phone.length == 10)
    });
  }

  connexion() {
    login(this.state.phone, this.state.password, (data) => {

      if (data.message) {
        console.log(data.message);
        Alert.alert(
          'Erreur',
          data.message,
          [
            { text: 'OK' },
          ],
          { cancelable: false },
        );
      }
      else {
        this.props.navigation.navigate('ContactList')
      }
    });
  }

  signUp() {
    this.props.navigation.navigate('SignUp')
  }

  forgotPassword() {
    //TODO Lien avec API ForgotPassword
  }

  render() {
    return (
      <>
        <KeyboardAvoidingView style={styles.container} enabled>
          <Image source={{uri:'../assets/logo.png'}} style={{ position: 'absolute', zIndex: -1,  width: 800,height: 600 }} />
          <ScrollView style={styles.textContainer}>
            <Text style={styles.titlePhone}>Numéro de téléphone :</Text>
            <TextInput style={styles.input} maxLength={10} value={this.state.phone} textContentType="telephoneNumber" placeholder="N° de tél" onChangeText={phone => this.handleChangePhone(phone)} />
            <Text style={styles.titlePhone}>Mot de passe :</Text>
            <TextInput style={styles.input} maxLength={4} value={this.state.password} textContentType="password" placeholder="Mot de Passe" onChangeText={pass => this.handleChangePassword(pass)} />
            <View style={styles.buttonContainer}>
              <Button style={styles.button} color={'#628B35'} onPress={() => this.connexion()} title="Connection" disabled={!this.state.isUserSetInfo} />
            </View>
          <View style={styles.buttonContainer}>
              <Button style={styles.button} color={'#9AC221'} onPress={() => this.signUp()} title="Vous n'avez pas de compte ?" />
            </View>
            <View style={styles.buttonContainer}>
            <Button style={styles.button} color={'#9AC221'} onPress={() => this.forgotPassword()} title="Mot de passe oublié ?" />
            </View>
            </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBDE6D',
  },
  textContainer: {
    padding: 20,
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  buttonContainer: {
    backgroundColor: '#9AC221',
    paddingVertical: 0,
    marginBottom: 10,
  },
  logo: {
    position: 'absolute',
    width: 200,
    height: 800
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
    fontWeight: '700',
    marginBottom: 5,
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

