import { BACKEND_URL } from '@env'

/**
 * Manda una petición al backend para crear una nueva alerta
 * @param {*} token Token de autenticación del backend
 * @returns Devuelve la respuesta de la petición
 */
async function subscribe( token ) {

    const response = await fetch(BACKEND_URL + '/suscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token
        })
    })
    
    const data = await response.json()

    return data
}

export { subscribe }