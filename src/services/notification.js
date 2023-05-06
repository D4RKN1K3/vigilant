import { BACKEND_URL } from '@env'

// Subscribe
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
    console.log(data)

    return data
}

export { subscribe }