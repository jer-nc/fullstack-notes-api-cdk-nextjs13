import { ProjectionType } from "@aws-sdk/client-dynamodb";
import { RemovalPolicy } from "aws-cdk-lib";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

type NotesTableProps = {
    tableName: string
}

export const createNotesTable = (scope: Construct, props: NotesTableProps) => {
    const notesTable = new Table(scope, `${props.tableName}`, {
        tableName: props.tableName,
        billingMode: BillingMode.PAY_PER_REQUEST,
        removalPolicy: RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE,
        partitionKey: {
            name: 'UserId',
            type: AttributeType.STRING
        },
        sortKey: {
            name: 'NoteId',
            type: AttributeType.STRING
        },
        
        
    })
    

    // add a global secondary index to the table after notesTable is created

    notesTable.addGlobalSecondaryIndex({
        indexName: 'TimestampIndex',
        partitionKey: {
            name: 'UserId',
            type: AttributeType.STRING
        },
        sortKey: {
            name: 'Timestamp',
            type: AttributeType.STRING
        },
        // projectionType: ProjectionType.ALL
    })


    return notesTable;
}