// // pages/protectedPage.tsx
// "use client"

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/app/services/auth';

// export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//     const router = useRouter();
//     const {user} = useAuth()
//     useEffect(() => {
//         const isAuthenticated = localStorage.getItem('isAuthenticated');
//         if (!user) {
//             router.push('/auth/register');     
//         }else{
//             router.replace('/')
//         }
//     }, [router,user]);

//     return <>{children}</>;
// };
