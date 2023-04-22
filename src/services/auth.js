// React native - Expo
// import env
import { AUTHENTICATION_API_URL } from '@env'
import { useNavigation } from '@react-navigation/native' 
import AsyncStorage from '@react-native-async-storage/async-storage';

// Login
async function login( username, password ) {
    
    console.log('username: ' + username)
    console.log('password: ' + password)
    console.log('AUTHENTICATION_API_URL: ' + AUTHENTICATION_API_URL + '/login')

    // const response = await fetch('https://backend-sistemaalertas-production.up.railway.app/login', {
    const response = await fetch(AUTHENTICATION_API_URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    
    const data = await response.json()
    console.log(data)

    return data
}

async function register( username, password , name, address, token){
    
    console.log('AUTHENTICATION_API_URL: ' + AUTHENTICATION_API_URL + '/register')
    
    const response = await fetch(AUTHENTICATION_API_URL + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
            name,
            address,
            token
        })
    })
    
    const data = await response.json()

    return data
}

async function getUser() {
    console.log("se verifica usuario en home")
    try {

        const user = await AsyncStorage.getItem('@user');
        //parse user to json
        const userJson = user!=null ? JSON.parse(user) : null;
        return userJson;

    } catch (error) {
        console.log(error);
    }
    return null;
}

// getToken
async function getToken() {
    try {
        const user = await AsyncStorage.getItem('@user');
        const userJson = user!=null ? JSON.parse(user) : null;
        console.log("desdetoken:"+userJson);
        return userJson.token;

    } catch (error) {
        console.log(error);
    }
}

export { login , register, getUser, getToken}