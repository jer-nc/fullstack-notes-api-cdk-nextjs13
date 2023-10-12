import { BookResponse } from "@/types/types";

export async function editBook(book: BookResponse) {
    const { title, id, description, jwt } = book

    const baseURL = process.env.APIGatewayURL;

    const bookToEdit = {
        title,
        NoteId: id,
        description,
    };

    try {
        const response = await fetch(`${baseURL}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify(bookToEdit)
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