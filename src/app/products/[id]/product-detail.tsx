// ProductDetailFetcher.ts
const getProductDetails = async (id: string) => {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await res.json();
        return product;
    } catch (error) {
        throw new Error('Product details not found');
    }
};

export default getProductDetails;
