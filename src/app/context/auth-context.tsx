'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import { auth } from '../services/firebase'

export const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    console.log(user)

    useEffect(() => {
        // const unsubscribe = onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         setUser({
        //             email: user.email,
        //             password: user,
        //         })
        //     } else {
        //         setUser(null)
        //     }
        //     setLoading(false)
        // })

        // return () => unsubscribe()

        if (user) {
            setUser({
                email: user.email,
                password: user.password,
            })
        }else{
            setUser(null)
        }
        setLoading(false)
    }, [])

    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = async(email: string, password: string) => {
        const logIn = await signInWithEmailAndPassword(auth, email, password)
        setUser(logIn)
        return logIn
    }

    const logout = async () => {
        setUser(null)
        await signOut(auth)
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}