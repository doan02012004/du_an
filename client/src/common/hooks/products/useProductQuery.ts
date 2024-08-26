/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query'
import { getProductById, getProducts } from '../../../services/products'

type Options = {
    id?:string|number,
    _gender?: string,
    _limit?:number,
    _page?:number|string|null,
    _sizes?:string|null,
    _colors?:string|null,
    _search?:string|null,
    _minPrice?:string|null,
    _maxPrice?:string|null,
    _category?:string
}

const useProductQuery = (options?:Options) => {
    const query = useQuery({
        queryKey: ['PRODUCT',options],
        queryFn: async () => {
            try {
                const data = options?.id? await getProductById(options.id) : await getProducts(options)
                return data
            } catch (error) {
                console.log(error)
            }
        }
    })
    return query
}

export default useProductQuery