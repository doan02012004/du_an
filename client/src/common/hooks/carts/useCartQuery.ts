

import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContextProvider'
import { getCart } from '../../../services/carts'



const useCartQuery = () => {
    const {currentUser} = useContext(AppContext)
    // const [cartLocal,] = useLocalStorage("carts", [])
    const query = useQuery({
        queryKey:['CARTS',currentUser?._id],
        queryFn: async() =>{
            if(!currentUser){
                return undefined
            }
            try {
                const data = await getCart(currentUser._id)
              return data
            } catch (error) {
              console.log(error)   
            }
        },
        enabled: !!currentUser?._id
    })
    return query
}

export default useCartQuery