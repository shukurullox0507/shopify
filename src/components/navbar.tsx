'use client'
import { useAuth } from '@/app/services/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { toast } from 'react-toastify';

const Navbar = () => {
    const router = useRouter();
    const { user, logout } = useAuth();

    const memoizedUser = useMemo(() => user, [user]);

    const handleLogOut = async () => {
        try {
            await logout();
            localStorage.setItem('isAuthenticated', 'false');
            localStorage.removeItem('user');
            toast.error('You have logged out');
        } catch (err:any) {
            console.error(err);
            toast.error(err.message);
        }
    };

    return (
        <>
            {memoizedUser && (
                <header className='flex items-center px-4 md:px-12 py-2 justify-between top-0 w-full z-50 shadow bg-white'>
                    <Link href={'/'}>Smart Shop</Link>
                    <div className='flex items-center space-x-2.5 text-sm'>
                        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                            {/* Add your navbar links */}
                            <Link href={'/'} className="mr-5 hover:text-gray-900">Home</Link>
                            <Link href={'/products'} className="mr-5 hover:text-gray-900">All products</Link>
                        </nav>
                        <Link href={'/products/create-product'}>
                            <button className='button bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black'>
                                Add new product
                            </button>
                        </Link>
                        <Link href={'/shopping-cart'}>
                            <button className='button bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black'>
                                My bag
                            </button>
                        </Link>
                        <button className='button bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black ml-3' onClick={handleLogOut}>
                            Log out
                        </button>
                    </div>
                </header>
            )}
        </>
    );
};

export default Navbar;
