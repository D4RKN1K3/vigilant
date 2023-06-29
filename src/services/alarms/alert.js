import { BACKEND_URL } from '@env'

// Alert
async function newAlert( authToken ) {
    const response = await fetch(BACKEND_URL + '/alerts/new', {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + authToken.toString()
        }
    })
    
    const data = await response.json()

    return data
}

async function getAlerts( authToken ) {
    try {
        const response = await fetch(BACKEND_URL + '/alerts', {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + authToken.toString()
            }
        })

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error)
    }
}

export { newAlert, getAlerts }