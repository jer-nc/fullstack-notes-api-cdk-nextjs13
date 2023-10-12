import { DynamoDBClient, DeleteItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient();

// Delete Item from DynamoDB table

async function deleteItem({ NoteId, sub }: { NoteId: string, sub: string }) {

    console.log('NoteId: ', NoteId);
    console.log('sub: ', sub);

    const params = {
        TableName: process.env.NOTES_TABLE_NAME,
        Key: {
            NoteId: { S: NoteId },
            UserId: { S: sub }
        }
    }
    try {
        const data = await client.send(new DeleteItemCommand(params));
        console.log("Success", data);
        return data;
    } catch (err) {
        console.log("Error", err);
        throw err;
    }
}

exports.handler = async (event: any) => {
    console.log('Event: ', JSON.parse(event.body));
    const sub = event.requestContext.authorizer.claims.sub;

    const { NoteId } = JSON.parse(event.body);

    if (!NoteId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Id is required' })
        }
    }

    await deleteItem({NoteId, sub});

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            message: `Book deleted successfully with id: ${NoteId}`
        })
    }
};