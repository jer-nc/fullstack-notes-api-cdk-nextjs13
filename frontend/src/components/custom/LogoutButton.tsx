import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/useAuthStore';
import UserPool from '@/UserPool'
import { useRouter } from 'next/navigation';


const LogoutButton = () => {
    const clearUserAndSession = useAuthStore((state) => state.clearUserAndSession);
    const { push } = useRouter()

    const handleLogout = () => {
        const user = UserPool.getCurrentUser();

        if (user) {
            user.signOut();
            clearUserAndSession(); 
            push('/')
        }
    };

    return (
        <Button className='w-full' variant='outline' onClick={handleLogout}>
            Logout
        </Button>
    )
}

export default LogoutButton