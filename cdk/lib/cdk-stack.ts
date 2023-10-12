import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createCognitoPool } from './auth/authPool';
import { createNotesTable } from './database/notesTable';
import { createPutNotesFunc } from './functions/putNoteFunc/construct';
import { createGetNotesFunc } from './functions/getNotesFunc/construct';
import { createCRUDLAPIGateway } from './api/apigateway';
import { createDeleteNotesFunc } from './functions/deleteNoteFunc/construct';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a User Pool Client for the API
    const userPoolClient = createCognitoPool(this, {
      poolName: 'notesUserPool'
    })

    // Create the Books DynamoDB table 
    const notesTable = createNotesTable(this, {
      tableName: 'notesTable'
    })

    // Create the putBooksFunc Lambda function
    const putNotesFunc = createPutNotesFunc(this, {
      functionName: 'putNotesFunc',
      notesTableArn: notesTable.tableArn,
      enviromentVars: {
        notesTableName: notesTable.tableName
      }
    })

    // Create the getBooksFunc Lambda function
    const getBooksFunc = createGetNotesFunc(this, {
      functionName: 'getNotesFunc',
      notesTableArn: notesTable.tableArn,
      enviromentVars: {
        notesTableName: notesTable.tableName
      }
    })

    // Create the deleteBooksFunc Lambda function
    const deleteNotesFunc = createDeleteNotesFunc(this, {
      functionName: 'deleteNotesFunc',
      notesTableArn: notesTable.tableArn,
      enviromentVars: {
        notesTableName: notesTable.tableName
      }
    })

    // Create the API Gateway for the Books API (/books)
    const notesAPI = createCRUDLAPIGateway(this, {
      apiName: 'NotesAPI',
      baseResourceName: 'notes',
      getAllBaseFunc: getBooksFunc,
      putItemBaseFunc: putNotesFunc,
      deleteItemBaseFunc: deleteNotesFunc,
      leafResourceName: 'noteId',
      // getItemLeafFunc: getItemBooksFunc,
      userPoolClient: userPoolClient
    })

  }
}
