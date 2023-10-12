import { CognitoUserPool, ICognitoUserPoolData } from "amazon-cognito-identity-js";

// Replace the UserPoolId and ClientId with your own values
const poolData: ICognitoUserPoolData = {
    UserPoolId: process.env.UserPoolId || '',
    ClientId: process.env.ClientId || ''
}

const userPool = new CognitoUserPool(poolData);

export default userPool;

