"use client"

import { User, createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/services/firebase';
import { toast } from 'react-toastify';

const Signup = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [signed, setSigned] = useState(false)
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();


    const signUp = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };  
  useEffect(() => {
    if (user) {
      router.push('/auth/login');
    }
  }, [user, router]);
  




  const handleSignUp = async (e: any) => {
    e.preventDefault();

    try {
      const res = await signUp(data.email, data.password);
      console.log(res);
      router.push('/auth/login');
      setSigned(true)
      toast.success('You have successfully registered')
    } catch (err:any) {
      console.log(err);
      toast.error(err.message)
    }
  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSignUp} className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-3xl font-semibold mb-6 text-center">Sign Up</h1>
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
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
