const url = "https://sm0ccafg1i.execute-api.us-east-1.amazonaws.com/dev"

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

export function createProduct(productId){
    const endpoint = `${url}/addProduct`
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}
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