import React, { Component } from 'react';
import {
  View, FlatList, ActivityIndicator, TouchableOpacity, NetInfo, Button
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import ContactItem from '../component/ContactItem';
import { login, getContacts } from '../api/APIClient';
import {getListContactFromDatabase, setListContactInDataBase} from '../api/AsyncStorage'

let _this = null

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
    headerRight: (
      <>
        <Button 
          onPress={() => _this.profilePress()}
          title= "P"
          color= "#fff">
        </Button>
        <Button 
          onPress={() => _this.addButtonPress()}
          title= "add"
          color= "#fff">
        </Button>
      </>
    ),
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      isConnect: false
    };

    this.completeData = [];

    this.getContactSetUp = this.getContactSetUp.bind(this);
    this.onPress = this.onPress.bind(this);
    this.searchFilterFunction = this.searchFilterFunction.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.handleConnectionChange = this.handleConnectionChange.bind(this);
    this.addButtonPress = this.addButtonPress.bind(this)
    
    this.profilePress = this.profilePress.bind(this)
    this.onPressItem = this.onPressItem.bind(this)
    this.renderSeparator = this.renderSeparator.bind(this)

  }

  componentDidMount() {
    _this = this;
    this.getContactSetUp();
    if (this.state.data.length > 0) {
      this.setState({ loading: false });
    } else {
      getListContactFromDatabase((data) =>{
        this.setState({data})
      })
    }
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
  
    componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
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

  addButtonPress(){
    this.props.navigation.navigate('AddContact')
  }
  profilePress(){
    this.props.navigation.navigate('UserProfile')
  }

  onPressItem = (item) => {
    this.props.navigation.navigate('DetailsContact', {contact: item})
  }

  getContactSetUp() {
    getContacts((data) => {
      this.completeData = data;
      this.setState({ data: this.completeData });
      this.setState({ loading: false });
      setListContactInDataBase(data);
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
          <TouchableOpacity onPress={()  => this.onPressItem(item)}>
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
