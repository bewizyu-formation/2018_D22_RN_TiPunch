import React, { Component } from 'react';
import {
  View, Text, TextInput, Button, Picker, Alert, StyleSheet, KeyboardAvoidingView, ScrollView, Image
} from 'react-native';
import { signUp } from '../api/APIClient'

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
      phone: '', password: '', lastname: '', firstname: '', profile: 'senior', email: '', borderColor: 'red',
    };

    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
    this.handleChangeLastname = this.handleChangeLastname.bind(this);
    this.handleChangeemail = this.handleChangeemail.bind(this);

    this.signUpInServer = this.signUpInServer.bind(this);
  }


  signUpInServer() {
    signUp(this.state.phone, this.state.password, this.state.firstname, this.state.lastname, this.state.email, this.state.profile.toUpperCase(), (data) => {
      if (data.message) {
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
        this.props.navigation.navigate('Login', { user: data })
      }
    })
  }

  isEmailValid(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email)) {
      this.setState({email});
      this.setState({borderColor: 'green'})
    }
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
        <KeyboardAvoidingView style={styles.container} enabled>
        <Image source={{uri:'../assets/logo.png'}} style={{position: 'absolute', zIndex: -1, width: 200,height: 800 }} />
          <ScrollView style={styles.textContainer}>
            <Text style={styles.titlePhone}>N° de téléphone</Text>
            <TextInput style={styles.input} maxLength={10} value={this.state.phone} textContentType="telephoneNumber" placeholder="N° de téléphone" onChangeText={phone => this.handleChangePhone(phone)} />
            <Text style={styles.titlePhone}>Prénom</Text>
            <TextInput style={styles.input} value={this.state.firstname} textContentType="name" placeholder="Prénom" onChangeText={firstname => this.handleChangeFirstname(firstname)} />
            <Text style={styles.titlePhone}>Nom</Text>
            <TextInput style={styles.input} value={this.state.lastname} textContentType="name" placeholder="Nom" onChangeText={lastname => this.handleChangeLastname(lastname)} />
            <Text style={styles.titlePhone}>Mot de passe</Text>
            <TextInput style={styles.input} maxLength={4} value={this.state.password} textContentType="password" placeholder="Mot de passe" onChangeText={pass => this.handleChangePassword(pass)} />
            <Text style={styles.titlePhone} >Email</Text>
            <TextInput style={styles.input} value={this.state.email} textContentType="emailAddress" placeholder="E-mail" onChangeText={email => this.handleChangeemail(email)}/>
            <Text style={styles.titlePhone}>Type de profil</Text>
            <Picker style={styles.input} selectedValue={this.state.profile} onValueChange={(itemValue) => this.setState({ profile: itemValue })}>
              <Picker.Item label="Senior" value="senior" />
              <Picker.Item label="Médecin" value="medecin" />
              <Picker.Item label="Famille" value="famille" />
            </Picker>
          </ScrollView>
          <Button color={'#628B35'} onPress={() => this.signUpInServer()} title="S'inscrire" />
        </KeyboardAvoidingView>
      </>
    );
  }
}


const styles = StyleSheet.create({

  searchContainer: {
    backgroundColor: '#FF6C00',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
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
    borderColor: 'red'
  }
  /*buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700'
  }*/
});

