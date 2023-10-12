'use client'
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import LogoutButton from './LogoutButton';
import { useAuthStore } from '@/store/useAuthStore';


const Navbar = () => {
    const { session, isLoading } = useAuthStore()
    const router = useRouter()

    const navigateSignIn = () => {
        router.push('/auth/sign-up')
    }

    return (
        <div className="flex w-full justify-end p-4  fixed top-0 z-50 bg-background">
            <div className="flex gap-2 items-center h-10">
                <p className='text-muted-foreground text-sm' >{session && session?.getIdToken().payload.email}</p>
                {session !== null ? (
                    <LogoutButton />
                ) : (
                    <Button onClick={navigateSignIn} type="button" disabled={isLoading} variant='primary' size='primary'>
                        Sign Up
                    </Button>
                )}
            </div>
        </div>
    )
}

export default Navbar