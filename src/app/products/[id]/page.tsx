// import withAuth from '@/app/utils/withAuth';
// import Footer from '@/components/footer';
// import CustomImage from '@/components/image';
// import { notFound } from 'next/navigation';
// import React from 'react'

// interface Props {
//     params: {
//         id: string;
//     }
// }
// const ProductDetailedPage = async ({ params: { id } }: Props) => {
//     try {
//         const res = await fetch(
//             `https://fakestoreapi.com/products/${id}`
//         );
//             const product = await res.json()



//         return (
//             <div className='max-w-5xl mx-auto flex md:flew-row items-center gap-8 px-4 mt-48 pb-10'>
//                 <CustomImage product={product}/>
//                 <div className='divide-2'>
//                     <div className='space-y-2 pb-8'>
//                         <h1 className='text-2xl md:text-4xl font-bold '>
//                             {product.title}
//                         </h1>
//                         <h2 className='text-gray-500 font-bold text-xl md:text-3xl'>
//                             ${product.price}
//                         </h2>
//                     </div>

//                     <div className='pt-4'>
//                         <p className='text-xs md:text-sm'>
//                             {product.description}
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         )
//     } catch (error) {
//         notFound()
//     }

// }

// export default ProductDetailedPage
'use client'
import { useRouter } from 'next/navigation';
import { notFound, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CustomImage from '@/components/image';
import withAuth from '@/app/utils/withAuth';

interface Props {
    user?: any; // Make the 'user' prop optional
}

const ProductDetailedPage = ({ user }: Props) => {
    const router = useRouter();
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
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

        fetchData();
    }, [id]);

    if (!user || !product) {
        return (
            <div className="container w-full h-screen flex justify-center align-center">
                <div className='h-13 w-13 rounded-full border-2 border-dotted border-blue-600 animate-spin' />
            </div>
        )
    }

    return (
        <div className='max-w-5xl mx-auto flex md:flew-row items-center gap-8 px-4 mt-48 pb-10'>
            <CustomImage product={product} />
            <div className='divide-2'>
                <div className='space-y-2 pb-8'>
                    <h1 className='text-2xl md:text-4xl font-bold '>{product.title}</h1>
                    <h2 className='text-gray-500 font-bold text-xl md:text-3xl'>${product.price}</h2>
                </div>
                <div className='pt-4'>
                    <p className='text-xs md:text-sm'>{product.description}</p>
                </div>
            </div>
        </div>
    );
};

export default withAuth(ProductDetailedPage);
