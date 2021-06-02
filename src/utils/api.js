const url = "https://doterra-app.herokuapp.com"

export function fetchProduct(productId){
    const endpoint = `${url}/products/getProduct/${productId}`
    
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
    console.log("creating product", productData)

    return fetch(endpoint, requestOptions)
            .then((res) => {
                console.log(res)
                return res.json();
            })
}

export function updateProduct(productId, productData){
    const endpoint = `${url}/products/updateProduct/`
    
    const requestOptions = {
        method: 'PUT',
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


export function createPedido(orderData){
    const endpoint = `${url}/pedidos/addPedido`
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(orderData)
    };

    return fetch(endpoint, requestOptions)
    .then((res) => {
        return res.json();
    })
}


export function fetchPedidos(){
    const endpoint = `${url}/pedidos/getPedidos`
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    };
    
    return fetch(endpoint, requestOptions)
            .then((res) => {
                return res.json();
            })
}

export function fetchPedido(pedidoId){
    const endpoint = `${url}/pedidos/getPedido/${pedidoId}`
    
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    };
    
    return fetch(endpoint, requestOptions)
            .then((res) => {
                return res.json();
            })
}

export function fetchCategories(){
    const endpoint = `${url}/products/getCategories`
    
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    };

    return fetch(endpoint, requestOptions)
    .then((res) => {
        return res.json();
    })
}

export function filterProducts(filterData){
    const endpoint = `${url}/products/filterProducts`
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(filterData)
    };

    return fetch(endpoint, requestOptions)
    .then((res) => {
        return res.json();
    })
}

export function searchProducts(searchData){
    const endpoint = `${url}/products/searchProduct`
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(searchData)
    };


    return fetch(endpoint, requestOptions)
    .then((res) => {
        return res.json();
    })
}

export function addProductImage(formData){
    const endpoint = `${url}/products/addProductImage`
    
    const requestOptions = {
        method: 'POST',
        body: formData
    };

    return fetch(endpoint, requestOptions)
    .then((res) => {
        return res.json();
    })
}

export function linkExistentProductToImage(linkData){
    const endpoint = `${url}/products/linkProductImage`
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(linkData)
    };

    return fetch(endpoint, requestOptions)
    .then((res) => {
        return res.json();
    })
}

export function deleteProductImage(body){
    const endpoint = `${url}/products/deleteProductImage`
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    };

    return fetch(endpoint, requestOptions)
    .then((res) => {
        return res.json();
    })
}