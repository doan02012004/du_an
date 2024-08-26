/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query'
import { getProductSlider } from '../../../services/products'

type Options = {
    _gender?:string,
    _isFeatured?: boolean,
    _isSale?: number
}
const useProductSlider = (options:Options) => {
    const query = useQuery({
        queryKey:['PRODUCTSLIDER',options],
        queryFn: async()=>{
            try {
            const data = await getProductSlider(options)
              return data
            } catch (error) {
                console.log(error)
            }
        }
    })
  return query
}

export default useProductSlider