// React native - Expo
// import env
import { BACKEND_URL, AUTH_URL, AUTH_KEY } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';

// Login
async function login( username, password, saveUser = true) {
    //log auth url
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
    if( data.error ){
        data.errors = [{
            path : "username",
            msg : data.error,
        }]
        return data
    }
    else if (data.errors){
        return data
    }

    // Desencriptar data
    const paquete = jwtDecode(data);

    // Guardar usuario
    if (saveUser){

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

// Registro
async function register( username, password , name, address, saveUser = true){
    
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

    // Guardar usuario
    if (saveUser){
        // Si no hay errores, se logea y se guarda el usuario
        const loginResponse = await login(username, password);
        if (loginResponse.errors){
            data.errors = [...data.errors, ...response.errors]
        }
    }

    return data
}

// Guarda el usuario localmente en el AsyncStorage
async function storeUser(userObject) {
    try {
        const jsonValue = JSON.stringify(userObject)
        await AsyncStorage.setItem('@user', jsonValue)
        return true;
    } catch (e) {
        // saving error
        console.log(e)
    }
    return false;    
}

// Se obtiene el usuario del AsyncStorage
async function getUser() {
    
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

// Quitar usuario del AsyncStorage, se usa para el logout
async function removeUser() {
    try {
        await AsyncStorage.removeItem('@user');
        return true;
    } catch (error) {
        console.log(error);
    }
    return false;
}

// Se obtiene el token del usuario del AsyncStorage
async function getToken() {
    try {
        const user = await AsyncStorage.getItem('@user');
        const userJson = user!=null ? JSON.parse(user) : null;
        return userJson.token;
    } catch (error) {
        console.log(error);
    }
    return null;
}

// Se valida si el usuario esta logeado
async function validateUser(navigation){
    const user = await getUser();
    if (user){
        return user;
    }
    navigation.navigate('Main');
}

// Se valida si el usuario esta logeado en main
async function validateUserMain(navigation){
    const user = await getUser();
    if (user){
        navigation.navigate('Home');
    }
}

export { login, register, getUser, getToken, storeUser, removeUser, validateUser, validateUserMain }
