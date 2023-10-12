import { NoteResponse } from "@/types/types";

export async function editNote(note: NoteResponse) {
    const { title, NoteId, description, jwt } = note

    const baseURL = process.env.APIGatewayURL;

    const noteToEdit = {
        title,
        NoteId: NoteId,
        description,
    };

    try {
        const response = await fetch(`${baseURL}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify(noteToEdit)
        });

        if (!response.ok) {
            throw new Error(`Error editing note: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error(`Error in editNote: ${error}`);
        return null;
    }
}