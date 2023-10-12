import { type } from "os"

export interface SignInResponse {
    idToken: {
        jwtToken: string
    }
}

export interface SignUpResponse {
    userSub: string
}

export type ConfirmRegistrationValues = {
    email: string
    code: string
    password: string
}

// BOOKS

export type NoteProps = {
    note: {
        NoteId: string
        title: string
        description: string
        Timestamp?: string
    }
}

export type NoteResponse = {
    title: string
    description: string
    jwt?: string
    NoteId: string
    Timestamp?: string
}