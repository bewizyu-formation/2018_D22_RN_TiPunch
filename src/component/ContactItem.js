import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class ContactItem extends Component {

    constructor(props) {
        super(props)

        this.firstName = props.contact.firstName
        this.lastName = props.contact.lastName
        this.phone = props.contact.phone
        this.email = props.contact.email
        this.profile = props.contact.profile
        this.gravatar = props.contact.gravatar
        this._id = props.contact._id
    }
    render() {
        return (
            <View style={styles.item}>
                <Image style={{ width: 30, height: 30 }} source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                />
                <Text >
                    {this.firstName} {this.lastName}
                </Text>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        width: '95%',
        height: 50,
    }
});