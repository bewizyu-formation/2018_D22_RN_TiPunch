import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';

export default class ContactItem extends Component {
  constructor(props) {
    super(props);

    this.firstname = props.contact.firstname;
    this.lastname = props.contact.lastname;
    this.phone = props.contact.phone;
    this.email = props.contact.email;
    this.profile = props.contact.profile;
    this.gravatar = props.contact.gravatar;
    this.id = props.contact.id;
  }

  render() {
    return (
      <View style={styles.item}>
        <Image
          style={{ width: 30, height: 30 }}
          source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
        />
        <Text>
          {this.firstname}
          {' '}
          {this.lastname}
          {this.email}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    width: '95%',
    height: 50,
  },
});
