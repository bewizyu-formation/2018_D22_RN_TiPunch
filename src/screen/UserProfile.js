import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, LayoutAnimation, PropTypes, TextInput, Button, Alert} from 'react-native';
import {getUser,login} from '../api/APIClient';

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        //const {navigation} = this.props;
        //this.user = navigation.getParam('user', {});

        this.state = {
            buttonEditComponent: <Button onPress={() => this.editProfil()} title='Modifier' />,
            user:{firstName:'',lastName:'',phone:'',mail:'',profile:''}
        };
        this.editProfil = this.editProfil.bind(this);
        this.saveProfil = this.saveProfil.bind(this);

        this.firstNameChange = this.firstNameChange.bind(this);
        this.lastNameChange = this.lastNameChange.bind(this);
        this.phoneChange = this.phoneChange.bind(this);
        this.mailChange = this.mailChange.bind(this);
        this.profileChange = this.profileChange.bind(this);

    }

    componentDidMount() {
        login("0600000002", "0000",(data)=>{
            console.log(data)
            getUser((data) => {
                console.log(data)   
                this.setState({user:data[0]})
            })
        })
        

        this.setState({
            firstNameEditable: false,
            lastNameEditable: false,
            phoneEditable: false,
            mailEditable: false,
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
        this.setState({ user: {firstName:text,lastName:this.state.user.lastName,phone:this.state.user.phone,mail:this.state.user.mail,profile: this.state.user.profile} })
    }
    lastNameChange(text) {
        this.setState({ user: {firstName:this.state.user.firstName,lastName:text,phone:this.state.user.phone,mail:this.state.user.mail,profile: this.state.user.profile} })
    }
    phoneChange(text) {
        this.setState({ user: {firstName:text,lastName:this.state.user.lastName,phone:text,mail:this.state.user.mail,profile: this.state.user.profile} })
    }
    mailChange(text) {
        this.setState({ user: {firstName:this.state.user.firstName,lastName:this.state.user.lastName,phone:this.state.user.phone,mail:text,profile: this.state.user.profile} })
    }
    profileChange(text) {
        this.setState({ user: {firstName:this.state.user.firstName,lastName:this.state.user.lastName,phone:this.state.user.phone,mail:this.state.user.mail,profile: text} })
    }

    editProfil() {
        this.setState({
            firstNameEditable: true,
            lastNameEditable: true,
            phoneEditable: true,
            mailEditable: true,
            profileEditable: true,
            buttonEditComponent: <Button onPress={() => this.saveProfil()} title='Sauvegarder' />
        });
    }

    saveProfil() {
        this.setState({
            firstNameEditable: false,
            lastNameEditable: false,
            phoneEditable: false,
            mailEditable: false,
            profileEditable: false,
            buttonEditComponent: <Button onPress={() => this.editProfil()} title='Modifier' />
        });
    }
    
    render() {
        console.log(this.state.user)
        return (
            <View>
                {this.state.buttonEditComponent}
                <TextInput id='firstNameId' type="text" value={this.state.user.firstName} onChangeText={(text) => this.firstNameChange(text)} editable={this.state.firstNameEditable} />
                <TextInput id='lastNameId' type="text" value={this.state.user.lastName} onChangeText={this.lastNameChange} editable={this.state.lastNameEditable} />
                <TextInput id='phoneId' type="text" value={this.state.user.phone} onChangeText={this.phoneChange} editable={this.state.phoneEditable} />
                <TextInput id='mailId' type="text" value={this.state.user.mail} onChangeText={this.mailChange} editable={this.state.mailEditable} />
                <TextInput id='profileId' type="text" value={this.state.user.profile} onChangeText={this.profileChange} editable={this.state.profileEditable} />
            </View>
        );
    }
}