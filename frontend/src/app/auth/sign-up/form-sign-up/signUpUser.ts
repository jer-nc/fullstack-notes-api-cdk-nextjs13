import userPool from "@/UserPool";
import { registerSignUpSchema } from "@/schemas/signup-schema";
import { z } from "zod";

export async function signUpUser(values : z.infer<typeof registerSignUpSchema>) {
    const { email, password } = values;
    
    return new Promise((resolve, reject) => {
        try {
            userPool.signUp(email, password, [], [], (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}