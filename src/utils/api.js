const url = "https://doterra-app.herokuapp.com"

export function fetchProduct(productId){
    const endpoint = `${url}/getProduct/${productId}`
    
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    };

    return fetch(endpoint, requestOptions)
            .then((res) => {
                return res.json();
            })
    
}

export function createProduct(productData){
    const endpoint = `${url}/products/addProduct`
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(productData)
    };
    
    return fetch(endpoint, requestOptions)
            .then((res) => {
                return res.json();
            })
}

export function updateProduct(productId, productData){
    const endpoint = `${url}/updateProduct`
    
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(
            {
                productId,
                ...productData
            })
    };
    
    return fetch(endpoint, requestOptions)
            .then((res) => {
                return res.json();
            })
}

export function fetchProducts(){
    const endpoint = `${url}/products/getProducts`
    
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    };
    
    return fetch(endpoint, requestOptions)
            .then((res) => {
                return res.json();
            })
}

export function deleteProducts(productIds){
    var endpoint = `${url}/products/deleteProducts`

    console.log(productIds)
    
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(productIds)
    };
    
    return fetch(endpoint, requestOptions)
            .then((res) => {
                return res.json();
            })
}

export function fetchEvents(){
    const endpoint = `${url}/events/getEvents`
    
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    };
    
    return fetch(endpoint, requestOptions)
            .then((res) => {
                return res.json();
            })
}

export function createEvent(EventData){
    const endpoint = `${url}/events/addEvent`
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(EventData)
    };
    
    return fetch(endpoint, requestOptions)
            .then((res) => {
                return res.json();
            })
}

export function deleteEvents(eventIds){
    var endpoint = `${url}/events/deleteEvents`
    
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(eventIds)
    };
    
    return fetch(endpoint, requestOptions)
            .then((res) => {
                return res.json();
            })
}

export function fetchEvent(eventId){
    const endpoint = `${url}/events/getEvent/${eventId}`
    
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    };

    return fetch(endpoint, requestOptions)
            .then((res) => {
                return res.json();
            })
    
}

export function updateEvent(eventId,eventData){
    const endpoint = `${url}/events/updateEvent`
    
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(
            {
                eventId,
                ...eventData
            })
    };

    return fetch(endpoint, requestOptions)
            .then((res) => {
                return res.json();
            })
    
}