
const url = 'https://familink-api.cleverapps.io'
let token = ''


export const login = async (phone, password, callback) => {
    fetch(url + '/public/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone: phone,
            password: password,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        //token = data.token;
        callback(data)
    })
    .catch(e => {console.log(e);})
}

export const getUser = async (callback) => {
    fetch(url + '/secured/users', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        callback(data)
    })
    .catch(e => {console.log(e);})
}

export const updateUser = async (contact, callback) => {
    fetch(url + '/secured/users', {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : "Bearer " + token
        },
        body: JSON.stringify({
            "firstName": contact.firstName,
            "lastName": contact.lastName,
            "email": contact.email,
            "profile": contact.profile
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        callback(data)
    })
    .catch(e => {console.log(e);})
}

export const getContacts = async (callback) => {
    fetch(url + '/secured/users/contacts', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        callback(data)
    })
    .catch(e => {console.log(e);})
}

export const addContact = async (contact, callback) => {
    fetch(url + '/secured/users/contacts', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : "Bearer " + token
        },
        body: JSON.stringify({
            "phone": contact.phone,
            "firstName": contact.firstName,
            "lastName": contact.lastName,
            "email": contact.email,
            "profile": contact.profile,
            "gravatar" : contact.gravatar,
            "isFamilinkUser" : contact.isFamilinkUser,
            "isEmergencyUser": contact.isEmergencyUser
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        callback(data)
    })
    .catch(e => {console.log(e);})
}

export const deleteContact = async (contact, callback) => {
    fetch(url + '/secured/users/contacts/'+ contact.id, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        callback(data)
    })
    .catch(e => {console.log(e);})
}

export const updateContact = async (contact, callback) => {
    fetch(url + '/secured/users/contacts/' + contact.id, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : "Bearer " + token
        },
        body: JSON.stringify({
            "phone": contact.phone,
            "firstName": contact.firstName,
            "lastName": contact.lastName,
            "email": contact.email,
            "profile": contact.profile,
            "gravatar" : contact.gravatar,
            "isFamilinkUser" : contact.isFamilinkUser,
            "isEmergencyUser": contact.isEmergencyUser
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        callback(data)
    })
    .catch(e => {console.log(e);})
}