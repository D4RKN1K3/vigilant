// React native - Expo
// import env
import { BACKEND_URL, AUTH_URL, AUTH_KEY } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';

/**
 * Permite logearse en el backend y obtener los datos del usuario
 * @param {string} email Email del usuario
 * @param {string} password Contraseña del usuario
 * @param {boolean} saveUser Booleano para guardar el usuario en el AsyncStorage
 * @returns 
 */
async function login( email, password, saveUser = true) {
    //log auth url
    const response = await fetch(AUTH_URL + '/credentials', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: email,
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

/**
 * Permite registrarse en el backend
 * @param {string} username Email del usuario
 * @param {string} password Contraseña del usuario
 * @param {string} name Nombre del usuario
 * @param {string} address Dirección del usuario
 * @param {boolean} saveUser Booleano para guardar el usuario en el AsyncStorage
 * @returns 
 */
async function register( correo, password , name, address, saveUser = true){
    
    const response = await fetch(BACKEND_URL + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: correo,
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

/**
 * Guarda el usuario localmente en el AsyncStorage
 * @param {Json} userObject Objeto del usuario
 * @returns {boolean} Devuelve true si se guardó correctamente
 */
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


/**
 * Obtiene el usuario del AsyncStorage
 * @returns {Json} Devuelve el usuario en formato JSON o null si no existe
 */
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

/**
 * Elimina el usuario del AsyncStorage
 * @returns {boolean} Devuelve true si se eliminó correctamente
 */
async function removeUser() {
    try {
        await AsyncStorage.removeItem('@user');
        return true;
    } catch (error) {
        console.log(error);
    }
    return false;
}

/**
 * Obtiene el token del usuario del AsyncStorage
 * @returns {string} Devuelve el token del usuario o null si no existe
 */
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

/**
 * Valida si el usuario esta logeado
 * @param {Navigation} navigation Objeto de navegación
 * @returns {Json} Devuelve el usuario en formato JSON o null si no existe
 */
async function validateUser(navigation){
    const user = await getUser();
    if (user){
        return user;
    }
    navigation.navigate('Main');
    return null;
}

// Se valida si el usuario esta logeado en main
/**
 * Valida si el usuario esta logeado
 * @param {Navigation} navigation
 */
async function validateUserMain(navigation){
    const user = await getUser();
    if (user){
        navigation.navigate('Home');
    }
}

export { login, register, getUser, getToken, storeUser, removeUser, validateUser, validateUserMain }
