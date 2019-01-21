import React, { Component } from 'react';
import {
  View, Text, TextInput, Button, Alert, Image, StyleSheet, Picker, ScrollView
} from 'react-native';
import { addContact } from '../api/APIClient';

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
    this.state = {
      firstname: '', lastname: '', mail: '', tel: '', avatarSource: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg',
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeMail = this.handleChangeMail.bind(this);
    this.handleChangeTel = this.handleChangeTel.bind(this);
    this.addContacts = this.addContacts.bind(this);
  }

  addContacts = () => {

    //TODO : add with api when the addFuntion work
    addContact(this.state.firstname, this.state.lastname, this.state.mail, this.state.tel, this.state.avatarSource)
    Alert.alert(
      'Contact ajouté',
      `Nom : ${this.state.lastname} Prenom: ${this.state.firstname} Mail : ${this.state.mail} Tel : ${this.state.tel}`,
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

  handleChangeUrl(url) {
    this.setState({ avatarSource: url });
  }

  render() {
    return (
      <>
        <ScrollView style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.titlePhone} >Nom du contact</Text>
            <TextInput style={styles.input} placeholder="Nom" onChangeText={lastname => this.handleChangeTitle(lastname)} />
            <TextInput style={styles.input} placeholder="Prénom" onChangeText={firstname => this.handleChangeTitle(firstname)} />
            <Text style={styles.titlePhone}>Mail</Text>
            <TextInput style={styles.input} placeholder="Mail" onChangeText={mail => this.handleChangeMail(mail)} />
            <Text style={styles.titlePhone}>Numéro de téléphone</Text>
            <TextInput style={styles.input} placeholder="N° de tél" onChangeText={tel => this.handleChangeTel(tel)} />
            <TextInput style={styles.input} placeholder="Url de l'avatar" onChangeText={url => this.handleChangeUrl(url)} />
            <Picker style={styles.input} selectedValue={this.state.profile} onValueChange={(itemValue) => this.setState({ profile: itemValue })}>
              <Picker.Item label="Senior" value="senior" />
              <Picker.Item label="Médecin" value="medecin" />
              <Picker.Item label="Famille" value="famille" />
            </Picker>
              <Image resizeMode="contain" style={styles.logo} source={{ uri: this.state.avatarSource }} />

            <View style={styles.buttonContainer}>
              <Button style={styles.button} color={'#9AC221'} onPress={() => this.addContact()} title="Ajouter un contact" />
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
};

const styles = StyleSheet.create({
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
  logo: {
    width: 200,
    height: 300,
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
  }
  /*buttonText:{
          color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }*/
});
