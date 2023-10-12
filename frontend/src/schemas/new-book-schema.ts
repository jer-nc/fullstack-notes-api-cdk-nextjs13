
import { z } from "zod";

export const newBookSchema = z.object({

    title: z.string().min(1, {
        message: "Title must be at least 1 character long."
    }),
    author: z.string().min(1,
        {
            message: "Author must be at least 1 character long."
        }),
    description: z.string().min(1, {
        message: "Description must be at least 1 character long."
    }),
    year: z.string(),
});
