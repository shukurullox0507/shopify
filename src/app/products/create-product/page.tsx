'use client'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const CreateProduct = () => {
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('https://fakestoreapi.com/products/categories');
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);
    const onSubmit = async (data: any) => {
        try {
            const requestData = {
                title: data.title,
                price: parseFloat(data.price),
                description: data.description,
                images: [data.image],
                category: data.category,
            };

            const res = await fetch('https://fakestoreapi.com/products', {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                const result = await res.json();
                console.log('Product created:', result);
                router.push('/products');
            } else {
                console.error('Error creating product');
            }
            toast.success("Product created successfully")
            reset()
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-lg">
            <h1 className="text-2xl font-semibold mb-6 text-center">Create Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block font-semibold mb-1">Product Title</label>
                    <input {...register('title')} id="title" className="w-full border rounded-lg px-3 py-2 focus:outline-none" required />
                </div>
                <div>
                    <label htmlFor="price" className="block font-semibold mb-1">Product Price</label>
                    <input {...register('price', { valueAsNumber: true })} id="price" type="number" className="w-full border rounded-lg px-3 py-2 focus:outline-none" required />
                </div>
                <div>
                    <label htmlFor="description" className="block font-semibold mb-1">Product Description</label>
                    <textarea {...register('description')} id="description" className="w-full border rounded-lg px-3 py-2 focus:outline-none" required />
                </div>
                <div>
                    <label htmlFor="category" className="block font-semibold mb-1">Category</label>
                    <select {...register('category')} id="category" className="w-full border rounded-lg px-3 py-2 focus:outline-none" required placeholder={'Choose a category'}>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="image" className="block font-semibold mb-1">Product Image URL</label>
                    <input {...register('image')} id="image" className="w-full border rounded-lg px-3 py-2 focus:outline-none" required />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300" >Create</button>
            </form>
        </div>
    );
};

export default CreateProduct;
