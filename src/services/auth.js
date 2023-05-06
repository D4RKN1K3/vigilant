// React native - Expo
// import env
import { BACKEND_URL, AUTH_URL, AUTH_KEY } from '@env'
import { useNavigation } from '@react-navigation/native' 
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

// Login
async function login( username, password ) {
    
    
    const response = await fetch(AUTH_URL + '/credentials', {
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
    if (data.errors){
        return data
    }

    // Desencriptar data
    const paquete = jwtDecode(data);
    return paquete
}

async function register( username, password , name, address, token){
    
    console.log('AUTHENTICATION_API_URL: ' + BACKEND_URL + '/register')
    
    const response = await fetch(BACKEND_URL + '/register', {
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