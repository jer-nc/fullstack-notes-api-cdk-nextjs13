import { z } from "zod";

export const registerSignInSchema = z.object({
    email: z
        .string()
        .email({ message: "Please enter a valid email address." }),
    password: z
        .string()
        .min(8)
        .refine((value) => /^[\S]+.*[\S]+$/.test(value), {
            message: "Password must be at least 8 characters long and must contain at least one special character or number.",
        })
        .refine((value) => /[a-z]/.test(value), {
            message: "Password must have lowercase characters.",
        })
        .refine((value) => /[A-Z]/.test(value), {
            message: "Password must have uppercase characters.",
        })
        .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value), {
            message: "Password must have symbol characters.",
        }),
});
