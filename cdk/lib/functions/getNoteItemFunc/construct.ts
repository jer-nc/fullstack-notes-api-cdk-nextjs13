import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as path from 'path';

// Define the props type for the createGetItemBookFunc function

type GetNoteItemFuncProps = {
    functionName: string
    notesTableArn: string
    enviromentVars: { notesTableName: string }
}
// Define the createGetItemBookFunc function that creates the getItemBookFunc Lambda function 
export const createGetItemNotesFunc = (scope: Construct, props: GetNoteItemFuncProps) => {
    const getItemNotesFunc = new NodejsFunction(scope, `${props.functionName}`, {
        functionName: `${props.functionName}`,
        runtime: Runtime.NODEJS_18_X,
        handler: 'handler',
        entry: path.join(__dirname, `./main.ts`),
        environment: {
            NOTES_TABLE_NAME: props.enviromentVars.notesTableName
        }
    })

    // Add the IAM policy to the getItemBookFunc Lambda function that allows it to get an item from the Books DynamoDB table
    getItemNotesFunc.addToRolePolicy(
        new PolicyStatement({
            actions: ['dynamodb:GetItem'],
            resources: [props.notesTableArn]
        }))

    return getItemNotesFunc
}