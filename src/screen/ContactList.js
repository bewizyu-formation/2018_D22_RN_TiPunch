import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import ContactItem from '../component/ContactItem';
import { SearchBar } from 'react-native-elements';
import  {login, getContacts} from '../api/APIClient';

class ContactList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: [],
            error: null,
        };

        this.completeData = []
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
        this.loginSetUp();
        console.log(this.state.data.length)
        if (this.state.data.length > 0) {
            
            this.setState({loading: false})
        }
    }

    loginSetUp () {
        login('0600000002', "0000", (data) => {
            getContacts((data) => {
                console.log(data)
                this.completeData = data;
                this.setState({data: this.completeData})
                this.setState({loading: false})
            })
        })
    }
        

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

    searchFilterFunction(text) {
        console.log(text);
        console.log(this.completeData);
        
        let contactsFilter = this.completeData.filter(el => {
            console.log(el);
            return el.firstName.toLowerCase().indexOf(text.toLowerCase()) > -1 || el.lastName.toLowerCase().indexOf(text.toLowerCase()) > -1
        });
        this.setState({data: contactsFilter})
    };

    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Votre recherche ici..."
                lightTheme
                round
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
            />
        );
    };

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
                style={{ marginBottom: 10, marginTop: 20 }}
                data={this.state.data}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={this.onPress}>
                        <ContactItem contact={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
            />
        );
    }

}
export default ContactList;
