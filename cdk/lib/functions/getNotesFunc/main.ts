import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const client = new DynamoDBClient();

// What is Unmarshalling? 
// Unmarshalling is the process of transforming the native representation of an item in DynamoDB to a more convenient one in your programming language.


async function scanAndUnmarshall(sub: string) {
    try {
        const params = {
            TableName: process.env.NOTES_TABLE_NAME,
            KeyConditionExpression: 'UserId = :sub',
            ExpressionAttributeValues: {
                ':sub': { S: sub },
            },
        };

        const results = await client.send(new QueryCommand(params));
        console.log(results);

        if (results.Items) {
            return results.Items.map((item) => unmarshall(item));
        }
        return results;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// Explanation:
// This function is used to get all books from the books table.
// The function uses the DynamoDB Scan API to get all books from the books table.
exports.handler = async ( event: any ) => {
    const sub = event.requestContext.authorizer.claims.sub;
    
    const results = await scanAndUnmarshall(sub);
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Controll-Allow-Credentials': true,
        },
        body: JSON.stringify(results)
    }
}