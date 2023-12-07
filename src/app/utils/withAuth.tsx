// utils/withAuthAndProtectedRoute.tsx
'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/app/services/auth';

const withAuth = (WrappedComponent: React.ComponentType) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const isRegistered = localStorage.getItem("isRegistered")

    const AuthAndProtectedRoute = (props: any) => {
        const router = useRouter();
        const { user, loading, setLoading } = useAuth();

        useEffect(() => {
            if(isAuthenticated == "true" && isRegistered =='true'){
                router.push('/');
            }else if(isAuthenticated == 'false' && isRegistered == 'true'){
                router.push("/auth/login");
            }else if (isRegistered == 'false'){
                router.push("/auth/register");
            }else{
                router.push("/auth/login");
            }

        }, [router, user, loading, setLoading]);

        return <WrappedComponent {...props} />;
    };

    return AuthAndProtectedRoute;
};

export default withAuth;
