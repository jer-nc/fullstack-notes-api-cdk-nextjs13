import {  NoteResponse } from "@/types/types";

export async function getNoteById({ id, jwt }: { id: string, jwt: string }): Promise<NoteResponse | null> {
    const baseURL = process.env.APIGatewayURL;;
    const testId = '60816279-c5b9-48f9-978f-691b3b6d92a4'
    try {
        const response = await fetch(`${baseURL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },

        });

        if (!response.ok) {
            throw new Error(`Error fetching book by ID: ${response.statusText}`);
        }

        const book = await response.json();
        return book;
    } catch (error) {
        console.error(`Error in getBookById: ${error}`);
        return null;
    }
}
