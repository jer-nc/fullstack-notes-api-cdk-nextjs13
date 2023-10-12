import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as path from 'path';


type putNotesFuncProps = {
    functionName: string
    notesTableArn: string
    enviromentVars : { notesTableName: string }
}
// Explanation:
// This function is used to put a note into the NotesTable table.

export const createPutNotesFunc = (scope: Construct, props: putNotesFuncProps) => {
    const putNotesFunc = new NodejsFunction(scope, `${props.functionName}`, {
        functionName: `${props.functionName}`,
        runtime: Runtime.NODEJS_18_X,
        handler: 'handler',
        entry: path.join(__dirname, `./main.ts`),
        environment: {
            NOTES_TABLE_NAME: props.enviromentVars.notesTableName
        }
    })

    // Allow the function to put and update items in the notes table (ROLE PERMISSIONS)
    putNotesFunc.addToRolePolicy(new PolicyStatement({
        actions: ['dynamodb:PutItem', 'dynamodb:UpdateItem'],
        resources: [props.notesTableArn]
    }))

    return putNotesFunc
}
