// utils/withAuth.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/app/services/auth'; // Assuming this is your authentication service
import Home from '../page';

const withAuth = (WrappedComponent: React.ComponentType) => {
    const Auth = (props: any) => {
        const router = useRouter();
        const { user, loading } = useAuth(); // Assuming this retrieves the logged-in user

        useEffect(() => {
            if (!loading && !user) {
                router.push('/auth/login'); // Redirect to login if user is not authenticated
            }
        }, [user, loading, router]);

        if (loading) {
            return <p>Loading...</p>; // Show a loading indicator while checking authentication status
        }

        return <Home />;
    };

    return Auth;
};

export default withAuth;

