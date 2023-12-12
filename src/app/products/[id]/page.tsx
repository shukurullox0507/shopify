
'use client'
import { useRouter } from 'next/navigation';
import { notFound, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CustomImage from '@/components/image';
import withAuth from '@/app/utils/withAuth';
import { ProductType } from '@/interfaces';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';


interface Props {
    user?: any; // Make the 'user' prop optional
}

const ProductDetailedPage = ({ user }: Props) => {
    const router = useRouter();
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);

    const fetchData = async () => {
        try {
            if (id) {
                const res = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await res.json();
                setProduct(data);
            }
        } catch (error) {
            notFound();
        }
    };
    const handleClick = () => {
        const products: ProductType[] =
            JSON.parse(localStorage.getItem('carts') as string) || [];

        const isExistProduct = products.find(c => c.id === product?.id);

        if (isExistProduct) {
            const updatedData = products.map(c => {
                if (c.id === product?.id) {
                    return {
                        ...c,
                        quantity: c.quantity + 1,
                    };
                }

                return c;
            });

            localStorage.setItem('carts', JSON.stringify(updatedData));
        } else {
            const data = [...products, { ...product, quantity: 1 }];
            localStorage.setItem('carts', JSON.stringify(data));
        }
        toast('Product added to your bag!!');
    };
    useEffect(() => {

        fetchData();
    }, [id]);

    if (!product) {
        return (
            <div className="container w-full h-screen flex justify-center align-center">
                <div className='h-13 w-13 rounded-full border-2 border-dotted border-blue-600 animate-spin' />
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {product?.image && (
                    <div className="flex justify-center">
                        <CustomImage product={product} />
                    </div>
                )}
                <div className="divide-2">
                    <div className="space-y-2 pb-8">
                        <h1 className="text-2xl md:text-4xl font-bold ">{product?.title}</h1>
                        <h2 className="text-gray-500 font-bold text-xl md:text-3xl">${product?.price}</h2>
                    </div><div className="flex items-center space-x-2 my-4">
                        <div className="flex items-center space-x-1">
                            {Array.from({ length: Math.floor(product.rating.rate) }, (_, i) => (
                                <StarIcon key={i} className="h-5 w-5 text-yellow-500" />
                            ))}
                            {Array.from({ length: 5 - Math.floor(product.rating.rate) }, (_, i) => (
                                <StarIconOutline key={i} className="h-5 w-5 text-yellow-500" />
                            ))}
                        </div>
                        <p className="text-blue-600 hover:underline cursor-pointer text-sm">
                            See all {product?.rating.count} reviews
                        </p>
                    </div>
                    <p>{product?.rating.rate}</p>
                    <div className="pt-4">
                        <p className="text-xs md:text-sm">{product?.description}</p>
                    </div>
                    
                    <button
                        onClick={handleClick}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-6 hover:bg-blue-600 transition-colors duration-300"
                    >
                        Add to Bag
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withAuth(ProductDetailedPage);