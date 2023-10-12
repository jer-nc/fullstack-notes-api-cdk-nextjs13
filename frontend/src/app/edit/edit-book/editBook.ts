import { BookResponse } from "@/types/types";

export async function editBook(book: BookResponse) {
    const { title, author, description, year, id, jwt } = book

    const baseURL = process.env.APIGatewayURL;

    try {
        const response = await fetch(`${baseURL}/books`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({ title, author, description, year, id })
        });

        if (!response.ok) {
            throw new Error(`Error editing book: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error(`Error in editBook: ${error}`);
        return null;
    }
}