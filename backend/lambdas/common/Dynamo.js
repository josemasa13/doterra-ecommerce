//Acceso a Dynamo

const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {

    //busca elemento en tabla
    async get (ID,TableName){
        const params = {
            TableName,
            Key: {
                ID
            }
        };

        const data = await documentClient
            .get(params)
            .promise()
        
        if(!data || !data.Item){
            throw Error(`Hubo un error recuperando el dato ID ${ID} de ${TableName}`)
        }

        console.log(data);

        return data.Item;
    },

    //agrega elemento a tabla
    async write (data,TableName){
        if(!data.ID){
            throw Error('No se encontro un ID en el data');
        }

        const params = {
            TableName,
            Item: data
        };

        const res = await documentClient.put(params).promise();

        if(!res){
            throw Error(`Hubo un error insertando ID de ${data.ID} en tabla ${TableName}`)
        }

        console.log(data);

        return data;
    }
}


module.exports = Dynamo;