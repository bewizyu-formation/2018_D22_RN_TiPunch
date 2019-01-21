import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, NetInfo} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import AddContact from './src/screen/AddContactScreen'
import LoginScreen from './src/screen/LoginScreen';
import DetailsContact from './src/screen/DetailsContactScreen';
import SignUp from './src/screen/SignUpScreen';
import UserProfile from './src/screen/UserProfile';
import ContactList from './src/screen/ContactList';
import NewPasswordScreen from './src/screen/NewPasswordScreen';

class App extends Component{
  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  AddContact: {
    screen: AddContact
  },
  ContactList: {
    screen: ContactList
  },
  DetailsContact: {
    screen: DetailsContact
  },
  SignUp: {
    screen: SignUp
  },
  UserProfile: {
    screen: UserProfile
  },
  NewPasswordScreen: {
    screen: NewPasswordScreen
  },
});

export default createAppContainer(AppNavigator);
