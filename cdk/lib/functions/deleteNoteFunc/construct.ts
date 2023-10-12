import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as path from 'path';

type deleteNotesFuncProps = {
    functionName: string
    notesTableArn: string
    enviromentVars: { notesTableName: string }
}

export const createDeleteNotesFunc = (scope: Construct, props: deleteNotesFuncProps) => {
    const deleteNotesFunc = new NodejsFunction(scope, `${props.functionName}`, {
        functionName: `${props.functionName}`,
        runtime: Runtime.NODEJS_18_X,
        handler: 'handler',
        entry: path.join(__dirname, `./main.ts`),
        environment: {
            NOTES_TABLE_NAME: props.enviromentVars.notesTableName
        }
    })

    deleteNotesFunc.addToRolePolicy(
        new PolicyStatement({
            actions: ['dynamodb:DeleteItem'],
            resources: [props.notesTableArn]
        }))

    return deleteNotesFunc
}