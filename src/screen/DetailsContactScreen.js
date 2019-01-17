import React, { Component } from 'react';
import {
  View, Image, TextInput, Button,
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

    console.log(this.contact);
    

    this.state = {
      imageUrl: this.contact.gravatar,
      buttonEditComponent: <Button onPress={() => this.editContact()} title="Modifier" />,
      firstName: this.contact.firstName,
      lastName: this.contact.lastName,
      phone: this.contact.phone,
      email: this.contact.email,
      profile: this.contact.profile,

    };
    this.editContact = this.editContact.bind(this);
    this.saveEdition = this.saveEdition.bind(this);
    this.call = this.call.bind(this);
    this.message = this.message.bind(this);
    this.email = this.email.bind(this);

    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.phoneChange = this.phoneChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.profileChange = this.profileChange.bind(this);

    this.changeImageUrl = this.changeImageUrl.bind(this);
  }

  componentDidMount() {
    this.setState({
      firstNameEditable: false,
      lastNameEditable: false,
      phoneEditable: false,
      emailEditable: false,
      profileEditable: false,
      imageUrlEditable: false,
    });
  }

call() {

}

message() {

}

email() {

}

  firstNameChange(text) {
    this.setState({ firstName: text });
  }

  lastNameChange(text) {
    this.setState({ lastName: text });
  }

  phoneChange(text) {
    this.setState({ phone: text });
  }

  emailChange(text) {
    this.setState({ email: text });
  }

  profileChange(text) {
    this.setState({ profile: text });
  }

  editContact() {
    this.setState({
      firstNameEditable: true,
      lastNameEditable: true,
      phoneEditable: true,
      emailEditable: true,
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
      emailEditable: false,
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
        <Button onPress={() => this.email()} title="email" />
        <TextInput id="phoneId" type="text" value={this.state.phone} onChangeText={this.phoneChange} editable={this.state.phoneEditable} />
        <TextInput id="emailId" type="text" value={this.state.email} onChangeText={this.emailChange} editable={this.state.emailEditable} />
        <TextInput id="profileId" type="text" value={this.state.profile} onChangeText={this.profileChange} editable={this.state.profileEditable} />
      </View>
    );
  }
}

DetailsContact.propTypes = {
  navigation: PropTypes.any.isRequired,
};
