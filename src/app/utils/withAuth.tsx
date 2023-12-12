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
        const { user} = useAuth();

        useEffect(() => {
            if(isAuthenticated == "true" && isRegistered =='true'){
                // router.back();
            }else if(isAuthenticated == 'false'){
                router.push("/auth/login");
            }else if (!user || isRegistered == 'false'){
                router.push("/auth/register");
            }else{
                router.push("/auth/login");
            }

        }, [router, user]);

        return <WrappedComponent {...props} />;
    };

    return AuthAndProtectedRoute;
};

export default withAuth;
