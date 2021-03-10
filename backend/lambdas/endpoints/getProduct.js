const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo'); 

//toma nombre de tabla declarada en serverless
const tableName = process.env.tableName;

exports.handler = async event =>{
    console.log('event', event);


    //checa si el evento contiene una ID
    if(!event.pathParameters || !event.pathParameters.ID){
        //fallo no se ingreso un ID

        return Responses._400({message: 'ID faltante'});
    }

    let ID = event.pathParameters.ID;

    const product = await Dynamo.get(ID,tableName).catch(err => {
        console.log('error in Dynamo Get',err);
        return null;
    })

    if(!product){
        return Responses._400({message: 'No existe producto con ese ID'})
    }

    return Responses._200({product});
}


//datos temporales hasta que se tenga el frontend
const data = {
    1: {name:'doterraProduct 1', price:1000, tipo: 'aceite esencial', descripcion:'producto milagroso'},
    2: {name:'doterraProduct 2', price:800, tipo: 'jabon esencial', descripcion:'jabon milagroso'},
    3: {name:'doterraProduct 3', price:750, tipo: 'Te', descripcion:'tecito milagroso'}
}