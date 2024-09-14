
import { useQuery } from '@tanstack/react-query'
import { getCart } from '../../../services/carts'



const useCartQuery = (userId:string) => {
   
    const query = useQuery({
        queryKey:['CARTS',userId],
        queryFn: async() =>{
            try {
                const data = await getCart(userId)
              return data
            } catch (error) {
              console.log(error)   
            }
        },
        enabled: !!userId
    })
    return query
}

export default useCartQuery