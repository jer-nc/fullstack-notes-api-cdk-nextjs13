import { BookProps } from "@/types/types";

export async function createBook({ title, author, description, year ,jwt }: { title: string, author: string, description: string, year: string , jwt: string}): Promise<BookProps | null> {
    const baseURL = process.env.APIGatewayURL;

  // console.log(`APIGatewayURL: ${baseURL}`);

    const book = {
        title,
        // author,
        description,
        // year,
    };

    try {
        if (!baseURL) {
            throw new Error('APIGatewayURL is not defined');
        }
        const response = await fetch(`${baseURL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify(book),
        });

        if (!response.ok) {
            throw new Error(`Error creating book: ${response.statusText}`);
        }


        return response as unknown as BookProps;
    } catch (error) {
        console.error(`Error in createBook: ${error}`);
        return null;
    }
}