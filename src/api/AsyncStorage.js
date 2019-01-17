import { AsyncStorage } from "react-native"

export const setListContactInDataBase = async (data) => {
    try {
        console.log('set data in database')
        await AsyncStorage.setItem('listcontact', JSON.stringify(data));
        await getListContactFromDatabase(() => {
            console.log('Async: ' + data);
        })
    } catch (error) {
      // Error saving data
    }
    console.log()
} 

export const getListContactFromDatabase = async (callback) => {
    try {
        console.log('get data in database')
        const value = await AsyncStorage.getItem('listcontact');
        if (value !== null) {
            console.log('return data from database')
            callback(JSON.parse(value));
        }
        else {
            callback([])
        } 
     } catch (error) {
       console.log(error)
     }
  }
