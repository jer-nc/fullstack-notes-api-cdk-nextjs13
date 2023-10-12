import { NoteProps } from "@/types/types";

export async function createNote({ title,  description,jwt }: { title: string, description: string, jwt: string}): Promise<NoteProps | null> {
    const baseURL = process.env.APIGatewayURL;

  // console.log(`APIGatewayURL: ${baseURL}`);

    const note = {
        title,
        description,
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
            body: JSON.stringify(note),
        });

        if (!response.ok) {
            throw new Error(`Error creating book: ${response.statusText}`);
        }


        return response as unknown as NoteProps;
    } catch (error) {
        console.error(`Error in createNote: ${error}`);
        return null;
    }
}