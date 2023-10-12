import userPool from "@/UserPool";
import { CognitoUser } from "amazon-cognito-identity-js";

export async function resendCode(email: string){
    return new Promise((resolve, reject) => {
        try {
            const userData = {
                Username: email,
                Pool: userPool,
            };
    
            const cognitoUser = new CognitoUser(userData);
    
            cognitoUser.resendConfirmationCode((error, result) => {
                if (error) {
                    console.error('Error resending code:', error);
                } else {
                  // console.log('Code resent successfully:', result);
                    resolve(result);
                }
            });
        }
        catch (error) {
            reject(error);
        }
    });
}