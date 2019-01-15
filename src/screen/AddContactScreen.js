import React, { Component } from 'react';
import {
  View, Text, TextInput, Button, Alert,
} from 'react-native';

export default class AddContact extends Component {
    static navigationOptions = {
      title: 'Ajout d\'un contact',
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
      this.state = { name: '', mail: '', tel: '' };
      this.handleChangeTitle = this.handleChangeTitle.bind(this);
      this.handleChangeMail = this.handleChangeMail.bind(this);
      this.handleChangeTel = this.handleChangeTel.bind(this);
      this.addContact = this.addContact.bind(this);
    }

    addContact = () => {
      Alert.alert(
        'Contact ajouté',
        `Nom : ${this.state.name} Mail : ${this.state.mail} Tel : ${this.state.tel}`,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    }

    handleChangeTitle(name) {
      this.setState({ name });
    }

    handleChangeMail(mail) {
      this.setState({ mail });
    }

    handleChangeTel(tel) {
      this.setState({ tel });
    }

    render() {
      return (
        <>
          <View>
            <Text>Nom du contact</Text>
            <TextInput placeholder="Nom" onChangeText={name => this.handleChangeTitle(name)} />
          </View>
          <View>
            <Text>Mail</Text>
            <TextInput placeholder="Mail" onChangeText={mail => this.handleChangeMail(mail)} />
          </View>
          <View>
            <Text>Numéro de téléphone</Text>
            <TextInput placeholder="N° de tél" onChangeText={tel => this.handleChangeTel(tel)} />
          </View>
          <Button onPress={() => this.addContact()} title="Ajouter un contact" />
        </>
      );
    }
}
