"use client"
import Footer from "@/components/footer";
import Product from "@/components/product";
import { ProductType } from "@/interfaces";
import { useProductsData } from "./hooks/useProductsData";
import { toast } from "react-toastify";

export default function Home() {
  const onSuccess = (data: ProductType) => {
    console.log("Perform side effect after data fetching", data)
  }

  const onError = (error: any) => {
    console.log("Error on fetching products:", error)
  }
  const {isLoading, isError, data, error} = useProductsData(onSuccess,onError)



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

  return (
    <>
      <main className="min-h-screen max-w-7xl px-8 mx-auto xl:px-0">
        <section className="flex flex-col space-y-12">
          <h1 className="text-xl text-blue-600 mt-5">Welcome to Smart Shop Deals</h1>
          <h1 className="text-5xl font-bold text-center">Smart Shop Deals</h1>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.data.map((product:ProductType) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}