'use client'
import UserPool from '@/UserPool';
import { useAuthStore } from '@/store/useAuthStore';
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import React, { useEffect } from 'react'

export const useAuth = () => {
    const [currentUser, setCurrentUser] = React.useState<CognitoUser | null>(null);
    const [session, setSession] = React.useState<CognitoUserSession | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        const currentUser = UserPool.getCurrentUser();
        useAuthStore.setState({ isLoading: false });
        if (currentUser) {
            currentUser.getSession((error: Error | null, session: null | CognitoUserSession) => {
                if (!error) {
                    setCurrentUser(currentUser);
                    setSession(session);
                    setIsLoading(false);
                    useAuthStore.setState({ user: currentUser, session: session, isLoading: false });

                } else {
                    setCurrentUser(null);
                    setSession(null);
                    setIsLoading(false);
                    useAuthStore.setState({ user: null, session: null, isLoading: false });
                }
            });

        } else {
            useAuthStore.setState({ user: null, session: null, isLoading: false });
        }
    }, []);

    return { currentUser, session, isLoading };
};
