import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as path from 'path';

// Explanation: 
// This function is used to get all books from the books table.

type GetNotesFuncProps = {
    functionName: string
    notesTableArn: string
    enviromentVars: { notesTableName: string }
}

export const createGetNotesFunc = (scope: Construct, props: GetNotesFuncProps) => {

    const getBooksFunc = new NodejsFunction(scope, `${props.functionName}`, {
        functionName: `${props.functionName}`,
        runtime: Runtime.NODEJS_18_X,
        handler: 'handler',
        entry: path.join(__dirname, `./main.ts`),
        environment: {
            NOTES_TABLE_NAME: props.enviromentVars.notesTableName
        }
    })

    getBooksFunc.addToRolePolicy(new PolicyStatement({
        actions: ['dynamodb:Query'],
        resources: [props.notesTableArn, `${props.notesTableArn}/index/TimestampIndex`]
    }))

    return getBooksFunc
}