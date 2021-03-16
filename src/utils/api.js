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