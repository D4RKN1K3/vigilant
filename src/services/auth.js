// React native - Expo
// import env
import { AUTHENTICATION_API_URL } from '@env'
console.log(AUTHENTICATION_API_URL)

// Login
async function login( username, password ) {
    
    console.log('username: ' + username)
    console.log('password: ' + password)

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
    
    // const response = await fetch('https://backend-sistemaalertas-production.up.railway.app/register', {
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

export { login , register}