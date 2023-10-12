# Notes App Demo

This project involves the creation of a Create, Read, Update, and Delete (CRUD) application for notes, with a user interface developed in Next.js 13 and a backend hosted on AWS. 

This is an updated version of the [Fullstack Book App](https://github.com/jer-nc/fullstack-book-crud-cdk-nextjs13) demo. This version is owner based, meaning that each user can only see their own data and make changes to it.

**The infrastructure is divided into two parts:** the creation of the backend using AWS CDK and the creation of the frontend using Next.js 13.

![](frontend/public/assets/cdk-crud-books-nextj13.webp)

## Demo Website

The demo website is available [here](https://main.d31bb2ix4eqyp8.amplifyapp.com/).

## CDK

### Creation of the NotesTable

- `PK:` Partition Key
- `SK:` Sort Key
- `GSI:` Global Secondary Index
- `Attributes:` [list of attributes]

The DynamoDB table "NotesTable" will store user notes with the following structure:

- `PK:` UserId (sub)
- `SK:` NoteId (UUID of the note)
- `Timestamp:` TimeStampIndex (GSI)
- `Title:` string
- `Description:` string

Example records in the table:

| UserID (Partition Key) | NoteID (Sort Key) | Title    | Description  | Timestamp            |
| ----------------------- | ----------------- | -------- | ------------ | --------------------- |
| User1 (sub)            | 550e8400-e29b-41d4-a716-446655440000 | Title 1  | Description 1 | 2023-10-11T09:00:00 |
| User1 (sub)            | 7ab1b59f-e120-4f28-9b71-1b96e8e27a88 | Title 2  | Description 2 | 2023-10-11T10:30:00 |
| User2 (sub)            | 016fdb9f-9502-48ac-b32a-1b67fb9f5b66 | Title 3  | Description 3 | 2023-10-11T11:45:00 |
| User3 (sub)            | d15b9b3f-2b68-4f04-91cd-d1558ee82b63 | Title 4  | Description 4 | 2023-10-11T08:15:00 |
| User2 (sub)            | 3ed7d7fc-1c5c-4b5f-9a07-85cf0f24e7ec | Title 5  | Description 5 | 2023-10-11T12:00:00 |
| User1 (sub)            | 83b1a7ed-779f-45da-b3d2-6f17a65e1cde | Title 6  | Description 6 | 2023-10-11T14:20:00 |

### Creation of Cognito User Pool

Create a user pool in Cognito, with the configuration of the client application (app Client) and an application domain (app domain).

## Frontend

The frontend developed in Next.js 13 interacts with the backend, allowing users to perform CRUD operations directly from the client. The frontend features include:

- Authentication with Cognito
- Note creation
- Note modification
- Note deletion
- Listing all notes and sorting by the most recent date using the Global Secondary Index (GSI)
- Retrieving a note by its ID

This project follows an "owner-based" approach, which means that each user can only access and modify their own data. In other words, the application ensures that a user can only view and manage the notes they have created, providing a high level of privacy and security.

> Please note that this project is experimental and not ready for production.
