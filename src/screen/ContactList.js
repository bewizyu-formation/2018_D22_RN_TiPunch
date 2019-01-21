import React, { Component } from 'react';
import {
  View, FlatList, ActivityIndicator, TouchableOpacity, NetInfo, Button, StyleSheet
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import ContactItem from '../component/ContactItem';
import { login, getContacts } from '../api/APIClient';
import {getListContactFromDatabase, setListContactInDataBase} from '../api/AsyncStorage'
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';


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
        <IconEvilIcons name="user" style={{marginRight: 5}} size={35} color="#fff" onPress={() => _this.profilePress()}/>
        <IconAntDesign name="plus" style={{marginLeft: 10, marginRight: 10}} size={30} color="#fff" onPress={() => _this.addButtonPress()}/>
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
    this.props.navigation.navigate('DetailsContact', {contact: item, reload: this.getContactSetUp})
  }

  getContactSetUp() {
    console.log('get Contact list')
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
      inputStyle={styles.searchBarInput}
      containerStyle={styles.searchBarContainer}
      placeholder="Votre recherche ici..."
      round
      lightTheme
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
      <View style={styles.container}>
        <FlatList
          style={styles.flatlist}
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()  => this.onPressItem(item)}>
              <ContactItem contact={item} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          stickyHeaderIndices={[0]}
        />
      </View>
    );
  }
}
export default ContactList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  flatlist: {
    width: '100%'
  },
  searchBarInput: {
    backgroundColor: "#E2E3E7"
  },
  searchBarContainer: {
    backgroundColor: "#628B35",
  }
});

/*
Primaire Vert :  #628B35 (RVB : 98 139 53)
Secondaire Vert : #9AC221 (RVB : 154 194 33)
Tertiaire Vert : #CBDE6D (RVB : 203 22 109)
Habillage Beige : #E5E1B8 (RVB : 229 225 184)
Fond Gris clair : #E2E3E7 (RVB : 226 227 231)
*/