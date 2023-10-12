import userPool from "@/UserPool";
import { ConfirmRegistrationValues } from "@/types/types";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

export async function confirmRegistration(values: ConfirmRegistrationValues) {
    const { email, code, password } = values;

    return new Promise((resolve, reject) => {
        try {
            const userData = {
                Username: email,
                Pool: userPool,
            };

            const cognitoUser = new CognitoUser(userData);

            // Call the confirm registration function
            cognitoUser.confirmRegistration(code, true, (error, result) => {
                if (error) {
                    console.error('Error confirming registration:', error);
                    reject(error); // Rechaza la promesa en caso de error
                } else {
                  // console.log('Registration confirmed successfully:', result);

                    const authDetails = new AuthenticationDetails({
                        Username: email,
                        Password: password
                    })

                    // Authentication should happen only after successful confirmation
                    // Authenticate the user after successful confirmation
                    cognitoUser.authenticateUser(authDetails, {
                        onSuccess: (data) => {
                          // console.log('Authentication successful:', data);
                            // Remove temporary password from Cookies after successful authentication : TODO!
                            resolve(data); // Resuelve la promesa con los datos exitosos
                        },
                        onFailure: (err) => {
                          // console.log('Authentication failed:', err);
                            reject(err); // Rechaza la promesa en caso de fallo en la autenticación
                        },
                        newPasswordRequired: (data) => {
                          // console.log('New password required: ', data);
                            resolve(data); // Resuelve la promesa con los datos exitosos
                        }
                    });
                }
            });
        }
        catch (error) {
            console.error('Error en try-catch:', error);
            reject(error); // Rechaza la promesa en caso de error en el bloque try-catch
        }
    });
}
