import React, { Component } from 'react';
import {
  View, FlatList, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import ContactItem from '../component/ContactItem';
import { login, getContacts } from '../api/APIClient';

class ContactList extends Component {
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

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
    };

    this.completeData = [];
  }

  componentDidMount() {
    this.loginSetUp();
    if (this.state.data.length > 0) {
      this.setState({ loading: false });
    }
  }

    renderSeparator = () => (
      <View
        style={{
          height: 1,
          width: '90%',
          backgroundColor: 'white',
          marginLeft: '14%',
        }}
      />
    );

    onPress = (item) => {
      // TODO Create Navigation to Contact Detail
    }

    loginSetUp() {
      login('0600000002', '0000', () => {
        getContacts((data) => {
          this.completeData = data;
          this.setState({ data: this.completeData });
          this.setState({ loading: false });
        });
      });
    }

    searchFilterFunction(text) {
      const contactsFilter = this.completeData.filter(
        el => el.firstName.toLowerCase().indexOf(text.toLowerCase()) > -1
      || el.lastName.toLowerCase().indexOf(text.toLowerCase()) > -1,
      );
      this.setState({ data: contactsFilter });
    }

    renderHeader = () => (
      <SearchBar
        placeholder="Votre recherche ici..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
      />
    );

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
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      );
    }
}
export default ContactList;
