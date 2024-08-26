
import { useMutation } from '@tanstack/react-query'
type newCart = {
    productId:number|string|undefined,
    attributeId:number|string|undefined,
    quantity:number
}
const fetchCarts = async(options:{action:string,newCart:newCart}) =>{
    try {
        switch (options.action) {
            case 'addtocart':
                
                break;
        
            default:
                break;
        }
    } catch (error) {
        console.log(error)
    }
}

const useCartMutation = () => {

    const mutatiton = useMutation({
        mutationKey:['CARTS'],
        mutationFn: (options:{action:string,newCart:newCart}) => fetchCarts(options)
    })
  return mutatiton
}

export default useCartMutation