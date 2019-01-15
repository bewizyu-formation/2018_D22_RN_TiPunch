import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ScrollView,LayoutAnimation, PropTypes, TextInput, Button, Alert} from 'react-native';

export default class AddContact extends React.Component {
    constructor(props){
        super(props);
        this.state = {name:'', mail:'', tel:''};
        this.navigateAddContact = this.navigateAddContact.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeMail = this.handleChangeMail.bind(this);
        this.handleChangeTel = this.handleChangeTel.bind(this);
        this.addContact = this.addContact.bind(this);
    }

    navigateAddContact(nameParam, defaultValue){
        this.props.navigation.navigate(nameParam, defaultValue)
    }

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

    handleChangeTitle(name){
        this.setState({name: name});
        console.log(this.state.name);
    }
    handleChangeMail(mail){
        this.setState({mail: mail});
        console.log(this.state.mail);
    }
    handleChangeTel(tel){
        this.setState({tel: tel});
        console.log(this.state.tel);
    }
    addContact = () => {
        Alert.alert(
            'Contact ajouté',
            'Nom : ' + this.state.name + ' Mail : ' + this.state.mail + ' Tel : ' + this.state.tel,
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <>
                <View>
                    <Text>Nom du contact</Text>
                    <TextInput placeholder={'Nom'} onChangeText={(name) => this.handleChangeTitle(name)}/>
                    <Text>Mail</Text>
                    <TextInput placeholder={'Mail'} onChangeText={(mail) => this.handleChangeMail(mail)}/>
                    <Text>Numéro de téléphone</Text>
                    <TextInput placeholder={'N° de tél'} onChangeText={(tel) => this.handleChangeTel(tel)}/>
                    <Button onPress={() => this.addContact()} title='Ajouter un contact' />
                </View>
            </>
        );
    }
}