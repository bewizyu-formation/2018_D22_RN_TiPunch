import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import Contact from '../model/Contact';
import ContactItem from '../component/ContactItem';

class ContactList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
        };

        this.arrayholder = [];
    }

    static navigationOptions = {
        title: 'Liste de contact',
        headerStyle: {
            backgroundColor: '#628B35',
        },
        headerTintColor: '#E2E3E7',
        headerTitleStyle: {
            fontWeight: '500',
        },
    };

    componentDidMount() {
        //TODO Add API
    }

    handleRefrech = () => {
        this.setState(
            {
                page: 1,
                seed: this.state.seed + 1,
                refreshing: true
            }
        )
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '90%',
                    backgroundColor: 'white',
                    marginLeft: '14%'
                }}
            />
        );
    };

    onPress = (item) => {
        //TODO Create Navigation to Contact Detail  
    }

    //TODO Add SearchBar to ContactList

    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <FlatList
                style={{ marginBottom: 20, marginTop: 20 }}
                data={this.state.data}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {
                        Alert.alert('Youhou')
                    }}>
                        <ContactItem
                            contact={item}
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.email}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
            />
        );
    }
}



export default ContactList;




