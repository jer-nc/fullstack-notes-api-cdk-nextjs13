import userPool from "@/UserPool";
import { CognitoUserSession } from "amazon-cognito-identity-js";

export async function getUser() {
  return new Promise(async (resolve, reject) => {
    const currentUser = userPool.getCurrentUser();

    try {
      if (currentUser) {
        currentUser.getSession((error: Error | null, session: null | CognitoUserSession) => {
          if (!error) {
            resolve({ currentUser, error: null ,session: session});

          } else {
            reject(error);
          }
        });
      } else {
        resolve({ currentUser: null, error: null });
      }
    } catch (error) {
    // console.log(error);
      reject(error);
    }
  });
}
