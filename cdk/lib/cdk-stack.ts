import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createCognitoPool } from './auth/authPool';
import { createNotesTable } from './database/notesTable';
import { createPutNotesFunc } from './functions/putNoteFunc/construct';
import { createGetNotesFunc } from './functions/getNotesFunc/construct';
import { createCRUDLAPIGateway } from './api/apigateway';
import { createDeleteNotesFunc } from './functions/deleteNoteFunc/construct';
import { createGetItemNotesFunc } from './functions/getNoteItemFunc/construct';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a User Pool Client for the API
    const userPoolClient = createCognitoPool(this, {
      poolName: 'notesUserPool'
    })

    // Create the Notes DynamoDB table 
    const notesTable = createNotesTable(this, {
      tableName: 'notesTable'
    })

    // Create the putNotesFunc Lambda function
    const putNotesFunc = createPutNotesFunc(this, {
      functionName: 'putNotesFunc',
      notesTableArn: notesTable.tableArn,
      enviromentVars: {
        notesTableName: notesTable.tableName
      }
    })

    // Create the getNotesFunc Lambda function
    const getNotesFunc = createGetNotesFunc(this, {
      functionName: 'getNotesFunc',
      notesTableArn: notesTable.tableArn,
      enviromentVars: {
        notesTableName: notesTable.tableName
      }
    })

    // Create the deleteNotesFunc Lambda function
    const deleteNotesFunc = createDeleteNotesFunc(this, {
      functionName: 'deleteNotesFunc',
      notesTableArn: notesTable.tableArn,
      enviromentVars: {
        notesTableName: notesTable.tableName
      }
    })

    // Create the getItemNotesFunc Lambda function
    const getItemNotesFunc = createGetItemNotesFunc(this, {
      functionName: 'getItemNotesFunc',
      notesTableArn: notesTable.tableArn,
      enviromentVars: {
        notesTableName: notesTable.tableName
      }
    })

    // Create the API Gateway for the Notes API (/notes)
    const notesAPI = createCRUDLAPIGateway(this, {
      apiName: 'NotesAPI',
      baseResourceName: 'notes',
      getAllBaseFunc: getNotesFunc,
      putItemBaseFunc: putNotesFunc,
      deleteItemBaseFunc: deleteNotesFunc,
      leafResourceName: 'noteId',
      getItemLeafFunc: getItemNotesFunc,
      userPoolClient: userPoolClient
    })

  }
}
