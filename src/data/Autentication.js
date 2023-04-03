// React native - Expo
// import env
import { AUTHENTICATION_API_URL } from '@env'
console.log(AUTHENTICATION_API_URL)


// Login
async function login(username, password) {
    try {
        const response = await requests.post(`${AUTHENTICATION_API_URL}/login`, {
            username,
            password,
        })
        return response
    } catch (error) {
        if (error instanceof HTTPError) {
            return error.response
        }
        throw error
    }
}

// Register
async function register(username, password) {
    try {
        const response = await requests.post(`${AUTHENTICATION_API_URL}/register`, {
            username,
            password,
        })
        return response
    } catch (error) {
        if (error instanceof HTTPError) {
            return error.response
        }
        throw error
    }
}

export { login , register}