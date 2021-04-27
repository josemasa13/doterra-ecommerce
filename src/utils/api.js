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
    const endpoint = `${url}/addProduct`
    
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
    const endpoint = `${url}/getProducts`
    
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    };
    
    return fetch(endpoint, requestOptions)
            .then((res) => {
                return res.json();
            })
}

export function deleteProduct(productId){
    const endpoint = `${url}/deleteProduct/${productId}`
    
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'}
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