import React, { Component } from 'react';
import {
  View, Image, TextInput, Button, NetInfo, StyleSheet, Picker, Text
} from 'react-native';
import PropTypes from 'prop-types';
import call from 'react-native-phone-call';
import email from 'react-native-email';
import SendSMS from 'react-native-sms';

import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import {updateContact} from '../api/APIClient'

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
    this.reloadContactList = navigation.getParam('reload', {});
    
    console.log(this.contact);
    
    this.idContact = this.contact._id

    this.state = {
      imageUrl: this.contact.gravatar,
      buttonEditComponent: <Button onPress={() => this.editContact()} title="Modifier" />,
      firstName: this.contact.firstName,
      lastName: this.contact.lastName,
      phone: this.contact.phone,
      email: this.contact.email,
      profile: this.contact.profile,
      isConnect: false,
      iconEditSave: <IconFeather name="edit-2" style={styles.editSaveButton} size={35} color="#628B35" onPress={() => this.editContact()}/>,
      profileView: styles.viewRelative,
    };
    this.editContact = this.editContact.bind(this);
    this.saveEdition = this.saveEdition.bind(this);
    this.callFunction = this.callFunction.bind(this);
    this.message = this.message.bind(this);
    this.mail = this.mail.bind(this);

    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.phoneChange = this.phoneChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.profileChange = this.profileChange.bind(this);

    this.changeImageUrl = this.changeImageUrl.bind(this);
    this.handleConnectionChange = this.handleConnectionChange.bind(this);
    this.renderPicker = this.renderPicker.bind(this);

  }

  componentDidMount() {

    this.setState({
      firstNameEditable: false,
      lastNameEditable: false,
      phoneEditable: false,
      emailEditable: false,
      profileEditable: false,
      imageUrlEditable: false,
      ProfileComponent:  <Text style={styles.textProfile}>{this.state.profile}</Text>,

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
  callFunction() {
    const args = {
      number : this.state.phone,
      prompt: false,
    };

    call(args).catch(console.error);
  };

  message() {
    SendSMS.send({
      body: '',
      recipients: [this.state.phone],
      successTypes: ['sent', 'queued']
    });

  }
  mail() {
    const to = [this.state.mail, '']
    email(to, {
      cc: ['', ''],
      bcc: '',
      subject: '',
      body: ''
    }).catch(console.error)
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
      iconEditSave: <IconAntDesign name="save" style={styles.editSaveButton} size={35} color="#628B35" onPress={() => this.saveEdition()}/>,
      profileView: {}
    });
  }

  renderPicker(){
    return (
      <View style={styles.pickerContainer}>
        <View style={this.state.profileView}></View>
      <Picker selectedValue={this.state.profile} 
          onValueChange={(itemValue) => {
          this.setState({ profile: itemValue });
          console.log(itemValue)
          }}>
          <Picker.Item label="Senior" value="Senior" />
          <Picker.Item label="Médecin" value="Medecin" />
          <Picker.Item label="Famille" value="Famille" />
      </Picker>
      </View>
    )
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
      iconEditSave: <IconFeather name="edit-2" style={styles.editSaveButton} size={35} color="#628B35" onPress={() => this.editContact()}/>,
      profileView: styles.viewRelative 
    });

    let contact = {
      id: this.idContact,
      phone: this.state.phone,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      profile: this.state.profile,
      gravatar: this.state.imageUrl,
      isFamilinkUser: false,
      isEmergencyUser: false,
    }
    console.log(contact)
    updateContact(contact, (data) => {
      console.log('after update')
      this.reloadContactList();
    })

  }

  changeImageUrl(text) {
    this.setState({ imageUrl: text });
  }



  render() {
    return (
      <View style={styles.container}>
        {this.state.iconEditSave}
        <Image style={styles.profileImage} source={{ uri: this.state.imageUrl }} />
        <TextInput
          style={styles.imageUrl}
          value={this.state.imageUrl}
          onChangeText={this.changeImageUrl}
          editable={this.state.imageUrlEditable}
        />
        <View>
          <View style={styles.nameContactContainer} >
            <TextInput
              style={styles.firstNameContact}
              id="firstNameId"
              type="text"
              value={this.state.firstName}
              onChangeText={text => this.firstNameChange(text)}
              editable={this.state.firstNameEditable}
            />
            <TextInput 
              style={styles.lastNameContact}id="lastNameId" type="text" value={this.state.lastName} onChangeText={this.lastNameChange} editable={this.state.lastNameEditable} />
          </View>
          <View style={styles.contactConainer}>
            <IconAntDesign style={styles.callIcon} name="phone" size={35} color="#96CEB4" onPress={() => this.callFunction()}/>
            <IconAntDesign style={styles.messageIcon} name="message1" size={35} color="#FFCC5C" onPress={() => this.message()}/>
            <IconAntDesign style={styles.mailIcon} name="mail" size={35} color="#FF6F69" onPress={() => this.mail()}/>
          </View>
          <TextInput style={styles.phoneContact} id="phoneId" type="text" value={this.state.phone} onChangeText={this.phoneChange} editable={this.state.phoneEditable} />
          <TextInput style={styles.mailContact} id="emailId" type="text" value={this.state.email} onChangeText={this.emailChange} editable={this.state.emailEditable} />
          <View style={styles.viewProfile}> 
            <Text style={{fontSize: 20, textAlign: 'center'}} >Profile du contact :</Text>
            {this.renderPicker()}
          </View>
        </View> 
      </View>
    );
  }
}

DetailsContact.propTypes = {
  navigation: PropTypes.any.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  profileImage: {
    marginTop: 30,
    width: 150,
    height: 150,
    borderRadius: 75
  },
  imageUrl: {
    marginTop: 20,
  },
  firstNameContact: {
    fontSize: 40,
    marginRight: 5,
  },
  lastNameContact: {
    marginLeft: 5,
    fontSize: 40,
  },
  editSaveButton: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  nameContactContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  contactConainer: {
    flexDirection: 'row',
    width: "100%",
    alignItems: 'center'
  },
  callIcon: {
    margin:20,
  },
  messageIcon: {
    margin:20,
    marginLeft: 50,
  },
  mailIcon: {
    margin:20,
    marginLeft: 50,
  },
  phoneContact: {
    fontSize: 20,
    margin: 10,
  },
  mailContact: {
    fontSize: 20,
    margin: 10,
    marginBottom: 20,
  },
  textProfile: {

  },
  pickerContainer: {
    position: 'relative',
    width: '100%',
  },
  viewRelative: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    zIndex: 10
  }
});

/*
Primaire Vert :  #628B35 (RVB : 98 139 53)
Secondaire Vert : #9AC221 (RVB : 154 194 33)
Tertiaire Vert : #CBDE6D (RVB : 203 22 109)
Habillage Beige : #E5E1B8 (RVB : 229 225 184)
Fond Gris clair : #E2E3E7 (RVB : 226 227 231)
*/