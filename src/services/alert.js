import { AUTHENTICATION_API_URL } from '@env'

// Alert
async function newAlert( authToken ) {
    console.log('desde alert,js authToken: ' + authToken)
        
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

export { newAlert }