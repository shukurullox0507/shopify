'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/auth-context'
import { toast } from 'react-toastify';
import withAuth from '@/app/utils/withAuth'


const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const { user, login } = useAuth()

    const router = useRouter();


    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            await login(data.email, data.password);
            router.push('/');
            localStorage.setItem('isAuthenticated', 'true')
            toast.success('You have successfully logged in')

        } catch (error: any) {
            console.error('Login error:', error);
            toast.error(error.message)

        }
    };

    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [user, router])

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md max-w-md w-full">
                <h1 className="text-3xl font-semibold mb-6 text-center">Login</h1>
                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={data.email}
                        onChange={(e: any) =>
                            setData({
                                ...data,
                                email: e.target.value,
                            })
                        }
                        placeholder="Enter your email"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={data.password}
                        onChange={(e: any) =>
                            setData({
                                ...data,
                                password: e.target.value,
                            })
                        }
                        placeholder="Enter your password"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                        required
                    />
                </div>
                <p className='text-sm mb-2'>Do not have an account? <a href="/auth/register" className='text-blue-600'>Sign up</a></p>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default withAuth(Login)
