import userPool from "@/UserPool";
import { registerSignInSchema } from "@/schemas/signin-schema";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { z } from "zod";

export async function signInUser(values: z.infer<typeof registerSignInSchema>) {
    const { email, password } = values;

    return new Promise((resolve, reject) => {
        try {
            const user = new CognitoUser({
                Username: email,
                Pool: userPool
            });

            const authDetails = new AuthenticationDetails({
                Username: email,
                Password: password
            });

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                  // console.log('data', data);
                    resolve(data); // Resolve the promise with the data
                },
                onFailure: (err) => {
                    reject(err); 
                },
                newPasswordRequired: (data) => {
                  // console.log('new password required: ', data);
                }
            });
        } catch (error) {
          // console.log(error);
            reject(error); 
        }
    });
}
