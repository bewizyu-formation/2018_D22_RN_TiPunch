import { AsyncStorage } from "react-native"

export const setListContactInDataBase = async (data) => {
    try {
        await AsyncStorage.setItem('listcontact', JSON.stringify(data));
    } catch (error) {
        console.log(error)
    }
} 

export const getListContactFromDatabase = async (callback) => {
    try {
        const value = await AsyncStorage.getItem('listcontact');
        if (value !== null) {
            callback(JSON.parse(value));
        }
        else {
            callback([])
        } 
     } catch (error) {
       console.log(error)
     }
  }

export const setUser = async (id) => {
    try {
        await AsyncStorage.setItem('saveUser', id);
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (callback) => {
    try {
        const value = await AsyncStorage.getItem('saveUser');
        if (value !== null) {
            callback(value);
        }
        else {
            callback([])
        } 
     } catch (error) {
       console.log(error)
     }
}

export const removeItem = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch(exception) {
      return false;
    }
}



