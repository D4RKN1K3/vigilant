import { AUTHENTICATION_API_URL } from '@env'

// Alert
async function newAlert( authToken ) {
    
    console.log('AUTHENTICATION_API_URL: ' + AUTHENTICATION_API_URL + '/alerts/new')

    const response = await fetch(AUTHENTICATION_API_URL + '/alerts/new', {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + authToken.toString()
        }
    })
    
    const data = await response.json()
    console.log(data)

    return data
}

async function getAlerts( authToken ) {

    try {
        const response = await fetch(AUTHENTICATION_API_URL + '/alerts', {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + authToken.toString()
            }
        })

        const data = await response.json()
        console.log("desde obtener alertas"+data)

        return data
    } catch (error) {
        console.log(error)
    }
}

export { newAlert, getAlerts }