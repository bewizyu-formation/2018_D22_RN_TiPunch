import React, { Component } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Image
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
        isUserSetInfo: false
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

  componentDidUpdate() {
    const { navigation } = this.props;
    let user = navigation.getParam('user', null);
    if (user) {
      if (this.state.phone !== user.phone) {
        this.setState({ phone: user.phone, password: user.password });
      }
    }
  }

  handleChangePhone(phone) {
    this.setState({ 
      phone,
     });
  }

  handleChangePassword(pass) {
    this.setState({ 
      password: pass,
      isUserSetInfo:(pass===this.state.phone)
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

  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.loginContainer}>
            <Image resizeMode="contain" style={styles.logo} source={require('../assets/logo.png')} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.titlePhone}>Numéro de téléphone :</Text>
            <TextInput style={styles.input} value={this.state.phone} textContentType="telephoneNumber" placeholder="N° de tél" onChangeText={phone => this.handleChangePhone(phone)}/>
            <Text style={styles.titlePhone}>Mot de passe :</Text>
            <TextInput style={styles.input} value={this.state.password} textContentType="password" placeholder="Mot de Passe" onChangeText={pass => this.handleChangePassword(pass)}/>
            <Button style={styles.button} color={'#628B35'}onPress={() => this.connexion()} title="Connection" disabled={!this.state.isUserSetInfo} />
            <Button style={styles.button} color={'#9AC221'} onPress={() => this.signUp()} title="Vous n'avez pas de compte ?"/>
          </View>
        </View>
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
  logo: {
    position: 'absolute',
    width: 200,
    height: 800
  },
  input:{
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    color: 'black'
  },
  button:{
    tintColor: '#9AC221',
    backgroundColor: '#9AC221',
    paddingVertical: 15,
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




/*<View style={styles.containerlogo}>
<Image resizeMode="contain" style={styles.logo} source={require('../assets/logo.png')} />
</View>
<View style={styles.containerCase}>
<Text style={styles.titlePhone}>Numéro de téléphone :</Text>
<View style={styles.subtitleCase}>
  <TextInput value={this.state.phone} textContentType="telephoneNumber" placeholder="N° de tél" onChangeText={phone => this.handleChangePhone(phone)} />
</View>
<Text style={styles.titlePhone}>Mot de passe :</Text>
<View style={styles.subtitleCase}>
  <TextInput value={this.state.password} textContentType="password" placeholder="Mot de Passe" onChangeText={pass => this.handleChangePassword(pass)} />
</View>
</View>
<View style={styles.containerCase}>
<Button onPress={() => this.connexion()} title="Se connecter" style={{ color: 'red' }} />
</View>
<View style={styles.containerCase}>
<Button onPress={() => this.signUp()} title="S'inscrire" style={{ color: 'red' }} />
</View>

const styles = StyleSheet.create({

  containerCase: {
    padding: 30
  },
  containerlogo: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    position: 'absolute',
    width: 300,
    height: 100
  },
  phoneNumberCase: {
    height: 60,
    backgroundColor: '#CBDE6D',
    marginBottom: 10,
    padding: 0,
    color: '#CBDE6D'
  },
  passwordCase: {
    height: 60,
    backgroundColor: '#CBDE6D',
    marginBottom: 10,
    padding: 0,
    color: '#CBDE6D'
  },
  titlePhone: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  titlePhoneCase: {
    height: 60,
    backgroundColor: '#CBDE6D',
    marginBottom: 10,
    padding: 10,
    color: '#CBDE6D',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitleCase: {
    height: 60,
    backgroundColor: '#CBDE6D',
    marginBottom: 20,
    padding: 10,
    color: '#CBDE6D',
    fontSize: 16,
    fontWeight: 'bold',

  },
  button: {
    backgroundColor: 'blue',
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});*/

