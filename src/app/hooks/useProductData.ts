import { useQuery, useQueryClient } from "react-query"
import { request } from "../utils/axios-utils"
import { ProductType } from "@/interfaces"

const fetchProductDetail = (id: any) => {
    return request({ url: `/products/${id}` })
}

export const useProductData = (id: any) => {
    const queryClient = useQueryClient()
    return useQuery(['product', id], () => fetchProductDetail(id), {
        initialData: () => {
            const product = queryClient.getQueryData('products')
                //@ts-expect-error
                ?.data.find((product: ProductType) => product.id === parseInt(id))
            if (product) {
                return {
                    data: product
                }
            } else {
                return undefined
            }
        }

    })
}