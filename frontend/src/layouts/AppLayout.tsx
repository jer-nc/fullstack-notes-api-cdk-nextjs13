'use client'
import Navbar from '@/components/custom/Navbar'
import { getUser } from '@/lib/getUser'
import { useAuthStore } from '@/store/useAuthStore'
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useLayoutEffect, useState } from 'react'

interface AppLayoutProps {
    children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
    const { setUserAndSession } = useAuthStore()


    const { push } = useRouter();

    useLayoutEffect(() => {
        (async () => {
            const { currentUser, error, session } = await getUser() as { currentUser: CognitoUser | null, error: Error | null, session: CognitoUserSession | null };

          // console.log({ currentUser, error, session })

            if (!currentUser) {
                push("/");
                return;
            } else{
                setUserAndSession(currentUser, session)
            }
        })();
    }, []);

    return (
        <>
            <Navbar />
            <div className='max-w-[1200px] mx-auto pt-24 px-4 min-h-screen'>
                {children}
            </div>
        </>
    )
}

export default AppLayout