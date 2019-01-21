import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';
import PropTypes from 'prop-types';

export default class ContactItem extends Component {
  constructor(props) {
    super(props);

    this.firstName = props.contact.firstName;
    this.lastName = props.contact.lastName;
    this.phone = props.contact.phone;
    this.email = props.contact.email;
    this.profile = props.contact.profile;
    this.gravatar = props.contact.gravatar;
    this.id = props.contact._id;
  }

  render() {
    return (
      <View style={styles.item}>
        <Image
          style={styles.imageItem}
          source={{ uri: this.gravatar }}
        />
        <Text style={styles.textItem}>
          {this.firstName}
          {' '}
          {this.lastName}
        </Text>
        <Image style={styles.arrow} source={require('../assets/right_arrow.png')}></Image>
      </View>
    );
  }
}

ContactItem.propTypes = {
  contact: PropTypes.any.isRequired,
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 80,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderColor: '#E5E1B8',
    alignItems: 'center',
  },
  imageItem: {
    borderRadius:25,
    width: 50, 
    height: 50,
    margin: 10
  },
  textItem: {
    fontSize: 18,
    marginLeft: 10
  },
  arrow: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10
  }
});