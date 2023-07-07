import { BACKEND_URL } from '@env'

/**
 * Manda una petición al backend para crear una nueva alerta
 * @param {*} authToken Token de autenticación del backend
 * @returns Devuelve la respuesta del backend
 */
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

/**
 * Solicita las alertas al backend
 * @param {*} authToken Token de autenticación del backend
 * @returns Devuelve la respuesta del backend
 */
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