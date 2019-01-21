
import { Alert } from 'react-native';

const url = 'https://familink-api.cleverapps.io';
let token = '';


export const login = async (phone, password, callback) => {
  fetch(`${url}/public/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone,
      password,
    }),
  })
    .then(response => response.json())
    .then((data) => {
      token = data.token;
      if (callback) {
        callback(data);
      }
    })
    .catch((e) => {
      Alert.alert(
        e,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
};

export const signUp = async (phone, password, firstName, lastName, email, profile, callback) => {
  fetch(`${url}/public/sign-in`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone,
      password,
      firstName,
      lastName,
      email,
      profile
    }),
  })
    .then(response => response.json())
    .then((data) => {
      if (callback) {
        callback(data);
      }
    })
    .catch((e) => {
      Alert.alert(
        e,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
};

export const getUser = async (callback) => {
  fetch(`${url}/secured/users`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then((data) => {
      if (callback) {
        callback(data);
      }
    })
    .catch((e) => {
      Alert.alert(
        e,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
};

export const getUserAuthenticated = async (callback) => {
  fetch(`${url}/secured/users/current`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then((data) => {
      if (callback) {
        callback(data);
      }
    })
    .catch((e) => {
      Alert.alert(
        e,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
};

export const updateUser = async (contact, callback) => {
  fetch(`${url}/secured/users`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      profile: contact.profile,
    }),
  })
    .then(response => response.json())
    .then((data) => {
      if (callback) {
        callback(data);
      }
    })
    .catch((e) => {
      Alert.alert(
        e,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
};

export const getContacts = async (callback) => {
  fetch(`${url}/secured/users/contacts`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then((data) => {
      if (callback) {
        callback(data);
      }
    })
    .catch((e) => {
      Alert.alert(
        e,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
};

export const addContact = async (contact, callback) => {
  fetch(`${url}/secured/users/contacts`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      phone: contact.phone,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      profile: contact.profile,
      gravatar: contact.gravatar,
      isFamilinkUser: contact.isFamilinkUser,
      isEmergencyUser: contact.isEmergencyUser,
    }),
  })
    .then(response => response.json())
    .then((data) => {
      if (callback) {
        callback(data);
      }
    })
    .catch((e) => {
      Alert.alert(
        e,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
};

export const deleteContact = async (contact, callback) => {
  fetch(`${url}/secured/users/contacts/${contact.id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then((data) => {
      if (callback) {
        callback(data);
      }
    })
    .catch((e) => {
      Alert.alert(
        e,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
};

export const updateContact = async (contact, callback) => {
  fetch(`${url}/secured/users/contacts/${contact.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      phone: contact.phone,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      profile: contact.profile,
      gravatar: contact.gravatar,
      isFamilinkUser: contact.isFamilinkUser,
      isEmergencyUser: contact.isEmergencyUser,
    }),
  })
  .then((data) => {
      console.log('after then')
      if (callback) {
        callback(data);
      } 
    })
    .catch((e) => {
      Alert.alert(
        e,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    });
};
