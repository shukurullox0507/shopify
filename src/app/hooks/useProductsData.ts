import { useQuery } from "react-query"
import { request } from "../utils/axios-utils"

const fetchProducts = () => {
    return request({ url: 'products' })
}

export const useProductsData = (onSuccess:any, onError:any) => useQuery(
    'products',
    fetchProducts,
    {
        onError,
        onSuccess
    }
)