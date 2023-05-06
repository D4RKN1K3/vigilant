import { BACKEND_URL } from '@env'

// Alert
async function newAlert( authToken ) {
    console.log("obteniendo alertas desde: "+BACKEND_URL + '/alerts')
    const response = await fetch(BACKEND_URL + '/alerts/new', {
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
    console.log("obteniendo alertas desde: "+BACKEND_URL + '/alerts')
    try {
        const response = await fetch(BACKEND_URL + '/alerts', {
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