'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '../services/firebase';

export const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [user, setUser] = useState<FirebaseUser | any>(localStorage.getItem('user') || "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(user);
        const accessToken = getTokenFromLocalStorage();

    }, [loading, user, router]);

    const getTokenFromLocalStorage = () => {
        return window.localStorage.getItem('accessToken');
    };

    const removeTokenFromLocalStorage = () => {
        window.localStorage.removeItem('accessToken');
    };

    const signup = async (email: string, password: string) => {
        console.log(email, password);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user)
            router.push('/');
            return userCredential;
        } catch (error) {

            throw error;
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            //@ts-ignore
            window.localStorage.setItem('user', userCredential.user.accessToken)
            router.push('/');
            return userCredential;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            removeTokenFromLocalStorage();
            router.push('/auth/login');
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, setLoading }}>
            {loading ? <div className="container w-full h-screen flex justify-center align-center">
                <div className='h-13 w-13 rounded-full border-2 border-dotted border-blue-600 animate-spin' />
            </div> : children}
        </AuthContext.Provider>
    );
};
