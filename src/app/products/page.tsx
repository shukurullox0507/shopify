/* eslint-disable @next/next/no-async-client-component */
'use client'
import Feature from '@/components/feature'
import Product from '@/components/product'
import { ProductType } from '@/interfaces'
import React from 'react'
import Footer from '@/components/footer'
import { useProductsData } from '../hooks/useProductsData'

const ProductPage = async () => {

    const onSuccess = (data: ProductType) => {
        console.log("Products successfully fetched", data)
    }

    const onError = (error: any) => {
        console.log("Error on fetching products:", error)
    }
    const { isLoading, data } = useProductsData(onSuccess, onError)

    if (isLoading) {
        return (
            <div className="container w-full h-screen flex justify-center align-center">
                <div className='h-13 w-13 rounded-full border-2 border-dotted border-blue-600 animate-spin' />
            </div>
        )
    }

    return (
        <>
            <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0">
                <Feature />
                <section className="flex flex-col space-y-12">
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {data.data.map((product: ProductType) => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default ProductPage