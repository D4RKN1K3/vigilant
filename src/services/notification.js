import { AUTHENTICATION_API_URL } from '@env'

// Subscribe
async function subscribe( token ) {
        
    console.log('token: ' + token)

    const response = await fetch(AUTHENTICATION_API_URL + '/subscribe', {
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