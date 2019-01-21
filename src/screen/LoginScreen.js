import React, { Component } from 'react';
import {
  View, Text, TextInput, Button, NetInfo 
} from 'react-native';
import { login } from '../api/APIClient';
import {CheckBox} from 'react-native-elements';
import {setUser, getUser} from '../api/AsyncStorage';

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

      this.state = { phone: '', password: '', loginList: [], isConnect: true, checked : false, deco: false};
      this.handleChangePhone = this.handleChangePhone.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.connexion = this.connexion.bind(this);
    }

    componentDidMount() {
      NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
  
      NetInfo.isConnected.fetch().done(
          (isConnected) => {
              this.setState({ isConnect: isConnected }); 
          }
      );
      getUser((phone) => {
        this.setState({ phone });
        if(this.state.phone.length > 0){
          this.setState({ checked : true });
        } else {
          this.setState({checked : false})
        }
      });
    }
    handleChangePhonel(phone) {
      this.setState({ phone });
      this.state = { phone: '', password: ''};

      this.handleChangePhone = this.handleChangePhone.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this)
      this.connexion = this.connexion.bind(this)
      this.signUp= this.signUp.bind(this)
    }

    componentDidUpdate(){
      
    }

    handleChangePhone(phone) {
      this.setState({ phone });
    }

    handleChangePassword(pass) {
      this.setState({ password: pass });
    }

    connexion() {
      if(this.state.checked){
         setUser(this.state.phone);
      } else {
         setUser('');
      }
      if(this.state.isConnect){
        login(this.state.phone, this.state.password, (data) => {
          this.setState({phone:'', password:'',checked:false});
          this.props.navigation.navigate('ContactList')
        });
      } else {
          this.props.navigation.navigate('ContactList', {connect: this.state.isConnect});
      }
    }

    signUp(){
      this.props.navigation.navigate('SignUp')
    }

    handleConnectionChange = (isConnected) => {
      this.setState({ isConnect: isConnected });
    }

      checkConnection(){
        if(this.state.isConnect){
          return (
            <View>
              <View>
                  <Text>N° de téléphone</Text>
                  <TextInput value={this.state.phone} textContentType="telephoneNumber" placeholder="N° de tél" onChangeText={phone => this.handleChangePhone(phone)} />
              </View>
              <View>
                  <Text>Mot de passe</Text>
                  <TextInput value={this.state.password} textContentType="password" placeholder="password" onChangeText={pass => this.handleChangePassword(pass)} />
              </View>
              <CheckBox title='Se souvenir de moi' checked={this.state.checked} onPress={() => this.setState({checked: !this.state.checked})}/>
              <Button onPress={() => this.connexion()} title="Se connecter" />
              <Button onPress={()=> this.signUp()} title="S'inscrire" />
            </View>
          )
        } else {
            return(
              <View>
                <Text>Vous n'êtes pas connecté à internet</Text>
                <Button onPress={() => this.connexion()} title="Passer en mode hors ligne" />
              </View>
            )
        }
      }

    componentWillUnmount() {
      NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    render() {
      return (
        <>
          {this.checkConnection()}
        </>
      );
    }
}
