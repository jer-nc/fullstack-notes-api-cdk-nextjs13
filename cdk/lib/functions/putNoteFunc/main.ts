import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient();


async function lambdaHandler(event: any): Promise<any> {
    // Parse the request body from the frontend
    const itemData = JSON.parse(event.body);
    // Set unique id for the item if it doesn't exist
    itemData.id = itemData.id ?? uuidv4();
    const date = new Date().toISOString();
    const sub = event.requestContext.authorizer.claims.sub;

    console.log('itemData: ', itemData)
    console.log('sub: ', sub)

    const newNote = {
        NoteId: itemData.id,
        UserId: sub,
        title: itemData.title,
        description: itemData.description,
        Timestamp: date,
    }

    console.log('newNote: ', newNote)


    // Marshall the item data to put into the DynamoDB table
    const marshalledItem = marshall(newNote, { removeUndefinedValues: true });


    // Set the parameters for the DynamoDB putItem function
    const params = {
        TableName: process.env.NOTES_TABLE_NAME,
        Item: marshalledItem
    };

    try {
        // Put the item into the DynamoDB table
        await client.send(new PutItemCommand(params));
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Controll-Allow-Credentials': true,
            },
            body: 'Item added to the table successfully!' // We can return JSON.stringify(itemData) if we want to return the item that was added to the table
        }
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: 'Internal Server Error'
        }
    }

}
exports.handler = lambdaHandler;