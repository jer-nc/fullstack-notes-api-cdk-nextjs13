export async function getAllBooks(jwt : string) {
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
            throw new Error(`Error fetching books: ${response.statusText}`);
        }

        const books = await response.json();
        return books;
    } catch (error) {
        console.error(`Error in getAllBooks: ${error}`);
        return null; // Retorna null en caso de error
    }
}