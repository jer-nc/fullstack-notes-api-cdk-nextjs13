'use client'
import { getUser } from '@/lib/getUser'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js'
import Loading from './loading'


export default function SignInLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const { push } = useRouter();

    useLayoutEffect(() => {
        (async () => {
            const { currentUser, error, session } = await getUser() as { currentUser: CognitoUser | null, error: Error | null, session: CognitoUserSession | null };

          // console.log({ currentUser, error, session })

            if (currentUser) {
                push("/dashboard");
                return;
            }

            // if the error did not happen, if everything is alright
            setIsSuccess(true);
        })();
    }, [push]);

    if (!isSuccess) {
        return <Loading />;
    }
    return (
        <main lang="en" suppressHydrationWarning className='scroll-smooth'>
            <header>
                {children}
            </header>
        </main>
    )
}
