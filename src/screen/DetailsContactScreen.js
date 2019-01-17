import React, { Component } from 'react';
import {
  View, Image, TextInput, Button, NetInfo
} from 'react-native';
import PropTypes from 'prop-types';

export default class DetailsContact extends Component {
  static navigationOptions = {
    title: 'Détails du contact',
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

    const { navigation } = this.props;
    this.contact = navigation.getParam('contact', {});

    this.state = {
      imageUrl: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
      buttonEditComponent: <Button onPress={() => this.editContact()} title="Modifier" />,
      firstName: this.contact.firstName,
      lastName: this.contact.lastName,
      phone: this.contact.phone,
      mail: this.contact.mail,
      profile: this.contact.profile,
      isConnect: false
    };
    this.editContact = this.editContact.bind(this);
    this.saveEdition = this.saveEdition.bind(this);
    this.call = this.call.bind(this);
    this.message = this.message.bind(this);
    this.mail = this.mail.bind(this);

    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.phoneChange = this.phoneChange.bind(this);
    this.mailChange = this.mailChange.bind(this);
    this.profileChange = this.profileChange.bind(this);

    this.changeImageUrl = this.changeImageUrl.bind(this);
    this.handleConnectionChange = this.handleConnectionChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      firstNameEditable: false,
      lastNameEditable: false,
      phoneEditable: false,
      mailEditable: false,
      profileEditable: false,
      imageUrlEditable: false,
    });
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

    NetInfo.isConnected.fetch().done(
        (isConnected) => {
            this.setState({ isConnect: isConnected }); 
        }
    );
  }

  handleConnectionChange = (isConnected) => {
    this.setState({ isConnect: isConnected });
    console.log(`is connected: ${this.state.isConnect}`);
  }
  
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  /* call() {

    }

    message() {

    }

    mail() {

    } */

  firstNameChange(text) {
    this.setState({ firstName: text });
  }

  lastNameChange(text) {
    this.setState({ lastName: text });
  }

  phoneChange(text) {
    this.setState({ phone: text });
  }

  mailChange(text) {
    this.setState({ mail: text });
  }

  profileChange(text) {
    this.setState({ profile: text });
  }

  editContact() {
    this.setState({
      firstNameEditable: true,
      lastNameEditable: true,
      phoneEditable: true,
      mailEditable: true,
      profileEditable: true,
      imageUrlEditable: true,
      buttonEditComponent: <Button onPress={() => this.saveEdition()} title="Save" />,
    });
  }

  saveEdition() {
    this.setState({
      firstNameEditable: false,
      lastNameEditable: false,
      phoneEditable: false,
      mailEditable: false,
      profileEditable: false,
      imageUrlEditable: false,
      buttonEditComponent: <Button onPress={() => this.editContact()} title="Modifier" />,
    });
  }

  changeImageUrl(text) {
    this.setState({ imageUrl: text });
  }

  render() {
    return (
      <View>
        {this.state.buttonEditComponent}
        <Image style={{ width: 50, height: 50 }} source={{ uri: this.state.imageUrl }} />
        <TextInput
          value={this.state.imageUrl}
          onChangeText={this.changeImageUrl}
          editable={this.state.imageUrlEditable}
        />
        <TextInput
          id="firstNameId"
          type="text"
          value={this.state.firstName}
          onChangeText={text => this.firstNameChange(text)}
          editable={this.state.firstNameEditable}
        />
        <TextInput id="lastNameId" type="text" value={this.state.lastName} onChangeText={this.lastNameChange} editable={this.state.lastNameEditable} />
        <Button onPress={() => this.call()} title="Appel" />
        <Button onPress={() => this.message()} title="Message" />
        <Button onPress={() => this.mail()} title="Mail" />
        <TextInput id="phoneId" type="text" value={this.state.phone} onChangeText={this.phoneChange} editable={this.state.phoneEditable} />
        <TextInput id="mailId" type="text" value={this.state.mail} onChangeText={this.mailChange} editable={this.state.mailEditable} />
        <TextInput id="profileId" type="text" value={this.state.profile} onChangeText={this.profileChange} editable={this.state.profileEditable} />
      </View>
    );
  }
}

DetailsContact.propTypes = {
  navigation: PropTypes.any.isRequired,
};
