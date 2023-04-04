// React native - Expo
// import env
import { AUTHENTICATION_API_URL } from '@env'
console.log(AUTHENTICATION_API_URL)


// Login
async function login(username, password) {

    //evniar json con username y password
    let formBody= new FormData()
    formBody.set('username', username)
    formBody.set('password', password)

    let data ={
        "username": username,
        "password": password
    }
    
    let url = `${AUTHENTICATION_API_URL}/login`
    console.log("Intentando logearse en " + url)
    // SEND POST FORM DATA
    const resultado = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data
    });
    console.log('resultado:')
    console.log(resultado)

}

// Register
async function register(username, password) {

}

export { login , register}