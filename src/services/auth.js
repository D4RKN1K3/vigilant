// React native - Expo
// import env
import { BACKEND_URL, AUTH_URL, AUTH_KEY } from '@env'
import { useNavigation } from '@react-navigation/native' 
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

// Login
async function login( username, password, saveUser = true) {
    //log auth url
    console.log('AUTHENTICATION_API_URL: ' + AUTH_URL + '/credentials')
    
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
    if (data.errors || data.error){
        if( data.error ){
            data.errors = [{
                path : "username",
                msg : data.error,
            }]
        }
        return data
    }

    // Desencriptar data
    const paquete = jwtDecode(data);

    // Guardar usuario
    if (saveUser){
        console.log("Guardando usuario", paquete)

        let ufs = paquete.user.tokenAuthServerToUser;

        let usuario = {
            nombre: ufs.name,
            email: ufs.username,
            direccion: ufs.address,
            token: ufs.tokenAuthServerToAPI
        }
        // Guardar el usuario en el AsyncStorage
        storeUser(usuario)
    }

    return paquete
}

async function register( username, password , name, address, token="", saveUser = true){
    
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
            address
        })
    })
    
    const data = await response.json();

    if( data.error ){
        data.errors = [{
            path : "username",
            msg : data.error,
        }]
    }
    
    if (data.errors){
        return data
    }

    // Si no hay errores, se logea y se guarda el usuario
    // Login
    const loginResponse = await login(username, password);
    if (loginResponse.errors){
        data.errors = [...data.errors, ...response.errors]
    }

    return data
}

// store user in storage
async function storeUser(value) {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@user', jsonValue)
    } catch (e) {
        // saving error
        console.log(e)
    }
    console.log("Usuario guardado")
}

// get user from storage
async function getUser() {
    console.log("se verifica usuario")
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

// remove user from storage / logout
async function removeUser() {
    try {
        await AsyncStorage.removeItem('@user');
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
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





export { login , register, getUser, getToken, storeUser, removeUser }
