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

    //
    const product = JSON.parse(event.body);
    product.ID = ID;

    const newProduct = await Dynamo.write(product, tableName).catch(err =>{
        console.log('Error agregando producto a DynamoDB', err);
        return null;
    })


    if(!newProduct){
        return Responses._400({message: 'Ocurrio un error, no se pudo agregar el nuevo producto'})
    }

    return Responses._200({newProduct});
}

