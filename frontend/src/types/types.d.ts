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

export type BookProps = {
    book: {
        id: string
        title: string
        author: string
        description: string
        year: string
    }
}

export type BookResponse = {
    id: string
    title: string
    author: string
    description: string
    year: string
    jwt?: string
}