
import { z } from "zod";

export const newNoteSchema = z.object({
    title: z.string().min(1, {
        message: "Title must be at least 1 character long."
    }),
    description: z.string().min(1, {
        message: "Description must be at least 1 character long."
    }),
});
