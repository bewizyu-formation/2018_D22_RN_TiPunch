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

    newPassword() {
        this.props.navigation.navigate('NewPasswordScreen')
    }
    
    isEmailValid(email) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email)) {
          this.setState({email});
          this.setState({borderColor: 'green'})
        }
      }

    render() {
        return (
            <View style={styles.container}>
                {this.state.buttonEditComponent}

                <View style={styles.textContainer}>
                <TextInput style={styles.input} id='firstNameId' type="text" value={this.state.user.firstName} onChangeText={(text) => this.firstNameChange(text)} editable={this.state.firstNameEditable} />
                <TextInput style={styles.input} id='lastNameId' type="text" value={this.state.user.lastName} onChangeText={this.lastNameChange} editable={this.state.lastNameEditable} />
                <TextInput style={styles.input} maxLength={10} id='phoneId' type="text" value={this.state.user.phone} onChangeText={this.phoneChange} editable={this.state.phoneEditable} />
                <TextInput style={styles.input} id='emailId' type="text" value={this.state.user.email} onChangeText={this.emailChange} editable={this.state.emailEditable} />
                <TextInput style={styles.input} id='profileId' type="text" value={this.state.user.profile} onChangeText={this.profileChange} editable={this.state.profileEditable} />
                </View>
                <Button color={'#9AC221'} onPress={() => this.newPassword()} title="Changer de Mot de Passe ?"/>
                   <Button onPress={() => this.deconnexion()} title="Déconnexion"/>

            </View>
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