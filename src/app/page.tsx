"use client"
import Footer from "@/components/footer";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Product from "@/components/product";
import { ProductType } from "@/interfaces";
import withAuth from "./utils/withAuth";

function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data: ProductType[] = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="container w-full h-screen flex justify-center align-center">
        <div className='h-13 w-13 rounded-full border-2 border-dotted border-blue-600 animate-spin' />
      </div>
    )
  }

  return (
    <>
    <main className="min-h-screen max-w-7xl px-8 mx-auto xl:px-0">
      <section className="flex flex-col space-y-12">
        <h1 className="text-xl text-blue-600 mt-5">Welcome to Smart Shop Deals</h1>
        <h1 className="text-5xl font-bold text-center">Smart Shop Deals</h1>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
        <Footer />
    </>
  );
}

export default withAuth(Home);
