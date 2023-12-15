
'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CustomImage from '@/components/image';
import withAuth from '@/app/utils/withAuth';
import { ProductType } from '@/interfaces';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { useProductData } from '@/app/hooks/useProductData';


const ProductDetailedPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);

    const { isLoading, data, isError, error } = useProductData(id)

    if (isLoading) {
        return (
            <div className="container w-full h-screen flex justify-center align-center">
                <div className='h-13 w-13 rounded-full border-2 border-dotted border-blue-600 animate-spin' />
            </div>
        )
    }
    if(isError){
        //@ts-expect-error
        return toast.error(error.message)
    }

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



    return (
        <div className="max-w-5xl mx-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {data.data?.image && (
                    <div className="flex justify-center">
                        <CustomImage product={data.data} />
                    </div>
                )}
                <div className="divide-2">
                    <div className="space-y-2 pb-8">
                        <h1 className="text-2xl md:text-4xl font-bold ">{data.data?.title}</h1>
                        <h2 className="text-gray-500 font-bold text-xl md:text-3xl">${data.data?.price}</h2>
                    </div><div className="flex items-center space-x-2 my-4">
                        <div className="flex items-center space-x-1">
                            {Array.from({ length: Math.floor(data.data.rating.rate) }, (_, i) => (
                                <StarIcon key={i} className="h-5 w-5 text-yellow-500" />
                            ))}
                            {Array.from({ length: 5 - Math.floor(data.data.rating.rate) }, (_, i) => (
                                <StarIconOutline key={i} className="h-5 w-5 text-yellow-500" />
                            ))}
                        </div>
                        <p className="text-blue-600 hover:underline cursor-pointer text-sm">
                            See all {data.data?.rating.count} reviews
                        </p>
                    </div>
                    <p>{data.data?.rating.rate}</p>
                    <div className="pt-4">
                        <p className="text-xs md:text-sm">{data.data?.description}</p>
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