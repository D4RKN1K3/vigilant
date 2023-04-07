// React native - Expo
// import env
import { AUTHENTICATION_API_URL } from '@env'
console.log(AUTHENTICATION_API_URL)


// Login
async function login( username, password ) {
    console.log("login")
    const response = await fetch('https://backend-sistemaalertas-production.up.railway.app/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    console.log("response" + response)
    console.log("text" + response.text())
    const data = await response.json()
    console.log(data)
    return data
}

// Register
async function register(username, password) {

}

export { login , register}