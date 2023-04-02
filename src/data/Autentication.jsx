// import
import requests from 'requests'
import { HTTPError } from 'requests/errors'
// import env
import { AUTHENTICATION_API_URL } from '@env'
console.log(AUTHENTICATION_API_URL)


// Login
function login(username, password) {
    try {
        response = requests.post(AUTHENTICATION_API_URL + '/login', json={'username': username, 'password': password})
        response.raise_for_status()
        return response.json()
    } catch (err) {
        if (err instanceof HTTPError) {
            console.log('HTTP error occurred: ${err}')
        } else {
            console.log('Other error occurred: ${err}')
        }
    }
    
}

// Register
function register(username, password) {
    try {
        var response = requests.post(AUTHENTICATION_API_URL + '/register', json={'username': username, 'password': password})
        response.raise_for_status();
        return response.json()
    } catch (err) {
        if (err instanceof HTTPError) {
            console.log('HTTP error occurred: ${err}')
        } else {
            console.log('Other error occurred: ${err}')
        }
    }
}