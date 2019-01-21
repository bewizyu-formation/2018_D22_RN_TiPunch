import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, LayoutAnimation, PropTypes, TextInput, Button, Alert } from 'react-native';
import { getUser, login } from '../api/APIClient';
import {setUser, removeItem} from '../api/AsyncStorage';
export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        //const {navigation} = this.props;
        //this.user = navigation.getParam('user', {});

        this.state = {
            buttonEditComponent: <Button onPress={() => this.editProfil()} title='Modifier' />,
            user: { firstName: '', lastName: '', phone: '', email: '', profile: '' }
        };
        this.editProfil = this.editProfil.bind(this);
        this.saveProfil = this.saveProfil.bind(this);

        this.firstNameChange = this.firstNameChange.bind(this);
        this.lastNameChange = this.lastNameChange.bind(this);
        this.phoneChange = this.phoneChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.profileChange = this.profileChange.bind(this);

    }

    deconnexion() {
        setUser('');
        removeItem('saveUser');
        removeItem('listcontact');
        this.props.navigation.navigate('Login', {deco: true});
      }

    componentDidMount() {
        getUser((data) => {
            console.log(data)
            this.setState({ user: data[0] })
        })

        this.setState({
            firstNameEditable: false,
            lastNameEditable: false,
            phoneEditable: false,
            emailEditable: false,
            profileEditable: false,
        })
    }
    static navigationOptions = {
        title: 'Profil Utilisateur',
        headerStyle: {
            backgroundColor: '#628B35',
        },
        headerTintColor: '#E2E3E7',
        headerTitleStyle: {
            fontWeight: '500',
        },
    };

    firstNameChange(text) {
        this.setState({ user: { firstName: text, lastName: this.state.user.lastName, phone: this.state.user.phone, email: this.state.user.email, profile: this.state.user.profile } })
    }
    lastNameChange(text) {
        this.setState({ user: { firstName: this.state.user.firstName, lastName: text, phone: this.state.user.phone, email: this.state.user.email, profile: this.state.user.profile } })
    }
    phoneChange(text) {
        this.setState({ user: { firstName: this.state.user.firstName, lastName: this.state.user.lastName, phone: text, email: this.state.user.email, profile: this.state.user.profile } })
    }
    emailChange(text) {
        this.setState({ user: { firstName: this.state.user.firstName, lastName: this.state.user.lastName, phone: this.state.user.phone, email: text, profile: this.state.user.profile } })
    }
    profileChange(text) {
        this.setState({ user: { firstName: this.state.user.firstName, lastName: this.state.user.lastName, phone: this.state.user.phone, email: this.state.user.email, profile: text } })
    }

    editProfil() {
        this.setState({
            firstNameEditable: true,
            lastNameEditable: true,
            phoneEditable: true,
            emailEditable: true,
            profileEditable: true,
            buttonEditComponent: <Button onPress={() => this.saveProfil()} title='Sauvegarder' />
        });
    }

    saveProfil() {
        this.setState({
            firstNameEditable: false,
            lastNameEditable: false,
            phoneEditable: false,
            emailEditable: false,
            profileEditable: false,
            buttonEditComponent: <Button onPress={() => this.editProfil()} title='Modifier' />
        });
    }

    render() {
        return (
            <View>
                {this.state.buttonEditComponent}
                <TextInput id='firstNameId' type="text" value={this.state.user.firstName} onChangeText={(text) => this.firstNameChange(text)} editable={this.state.firstNameEditable} />
                <TextInput id='lastNameId' type="text" value={this.state.user.lastName} onChangeText={this.lastNameChange} editable={this.state.lastNameEditable} />
                <TextInput id='phoneId' type="text" value={this.state.user.phone} onChangeText={this.phoneChange} editable={this.state.phoneEditable} />
                <TextInput id='emailId' type="text" value={this.state.user.email} onChangeText={this.emailChange} editable={this.state.emailEditable} />
                <TextInput id='profileId' type="text" value={this.state.user.profile} onChangeText={this.profileChange} editable={this.state.profileEditable} />
                <Button onPress={() => this.deconnexion()} title="Déconnexion"/>
            </View>
        );
    }
}