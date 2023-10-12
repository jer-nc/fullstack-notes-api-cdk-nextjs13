export async function deleteBook({ NoteId, jwt }: { NoteId: string, jwt: string }) {
    const baseURL = process.env.APIGatewayURL;

    try {
        const response = await fetch(`${baseURL}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({ NoteId })
        });

        if (!response.ok) {
            throw new Error(`Error deleting book: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error(`Error in deleteBook: ${error}`);
        return null;
    }
}