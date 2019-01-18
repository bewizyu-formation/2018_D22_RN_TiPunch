import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, NetInfo} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import AddContact from './src/screen/AddContactScreen'
import LoginScreen from './src/screen/LoginScreen';
import DetailsContact from './src/screen/DetailsContactScreen';
import SignUp from './src/screen/SignUpScreen';
import UserProfile from './src/screen/UserProfile';
import ContactList from './src/screen/ContactList';

class App extends Component{

  constructor(props){
    super(props);
    this.state = { isConnect: false }

    this.handleConnectionChange = this.handleConnectionChange.bind(this);
  }

  handleConnectionChange = (isConnected) => {
    this.setState({ isConnect: isConnected });
    console.log(`is connected: ${this.state.isConnect}`);
    }
    componentDidMount(){
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

    NetInfo.isConnected.fetch().done(
        (isConnected) => {
            this.setState({ isConnect: isConnected }); 
        }
    );
    }
    componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }
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
});

export default createAppContainer(AppNavigator);
