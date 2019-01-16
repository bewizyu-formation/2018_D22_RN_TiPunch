import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ScrollView,LayoutAnimation, PropTypes, TextInput, Button, Alert} from 'react-native';

export default class DetailsContact extends React.Component {
    constructor(props){
        super(props);

        const { navigation } = this.props;
        this.contact = navigation.getParam('contact', {})

        this.state = {
            isFamilyEditable:'',
            isEmergencyEditable:'', 
            buttonEditComponent: <Button onPress={() => this.editContact()} title='Modifier' />,
            firstName: this.contact.firstName,
            lastName: this.contact.lastName,
            phone: this.contact.phone,
            mail: this.contact.mail,
            profile: this.contact.profile,
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
        
    }
    componentDidMount(){
        this.setState({
            firstNameEditable: false ,
            lastNameEditable:false ,
            phoneEditable:false ,
            mailEditable:false ,
            profileEditable:false ,
        })
    }

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
    call(){

    }
    message(){

    }
    mail(){

    }
    firstNameChange(text) {
        console.log(text);
        console.log(this.state.firstName);
        this.setState({firstName: text})
    }
    lastNameChange(text) {
        this.setState({lastName: text})
    }
    phoneChange(text) {
        this.setState({phone: text})
    }
    mailChange(text) {
        this.setState({mail: text})
    }
    profileChange(text) {
        this.setState({profile: text})
    }

    editContact(){
        console.log('edit');
        this.setState({
            firstNameEditable: true ,
            lastNameEditable:true,
            phoneEditable:true,
            mailEditable:true,
            profileEditable:true,
            buttonEditComponent:  <Button onPress={() => this.saveEdition()} title='Save' />
        });
    }

    saveEdition(){
        console.log('save');
        this.setState({
            firstNameEditable: false ,
            lastNameEditable:false ,
            phoneEditable:false ,
            mailEditable:false ,
            profileEditable:false ,
            buttonEditComponent:  <Button onPress={() => this.editContact()} title='Modifier' />
        });
    }

    render() {
        return (
            <View>
                {this.state.buttonEditComponent}
                <Image style={{width:50, height: 50}} source={{uri:"https://facebook.github.io/react-native/docs/assets/favicon.png"}}/>
                <TextInput id='firstNameId' type="text" value={this.state.firstName} onChangeText = {(text) => this.firstNameChange(text)} editable={this.state.firstNameEditable}/>
                <TextInput id='lastNameId' type="text" value={this.state.lastName} onChangeText = {this.lastNameChange} editable={this.state.lastNameEditable}/>
                <Button onPress={() => this.call()} title='Appel' />
                <Button onPress={() => this.message()} title='Message' />
                <Button onPress={() => this.mail()} title='Mail' />
                <TextInput id='phoneId' type="text" value={this.state.phone} onChangeText = {this.phoneChange} editable={this.state.phoneEditable}/>
                <TextInput id='mailId' type="text" value={this.state.mail} onChangeText = {this.mailChange} editable={this.state.mailEditable}/>
                <TextInput id='profileId' type="text" value={this.state.profile} onChangeText = {this.profileChange} editable={this.state.profileEditable}/>
            </View>
        );
    }
}