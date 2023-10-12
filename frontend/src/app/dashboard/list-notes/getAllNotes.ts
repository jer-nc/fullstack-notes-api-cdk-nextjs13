export async function getAllNotes(jwt : string) {
    const baseURL = process.env.APIGatewayURL;
    try {
        const response = await fetch(`${baseURL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching notes: ${response.statusText}`);
        }

        const notes = await response.json();
        return notes;
    } catch (error) {
        console.error(`Error in getAllNotes: ${error}`);
        return null; // Retorna null en caso de error
    }
}