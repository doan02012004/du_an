
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addToCart, decreaseCart, increaseCart, updateQuantityCart } from '../../../services/carts'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContextProvider'
import { toast } from 'react-toastify'
type newCart = {
    productId: number | string | undefined,
    attributeId: number | string | undefined,
    quantity: number
}
// const fetchCarts = async(options:{action:string,newCart:newCart}) =>{
//     switch (options.action) {
//         case 'addtocart':
//             try {
//                 const request  = {
//                     ...options.newCart,
//                     userId:currentUser._id
//                 }
//                 await addToCart(request)
//             } catch (error) {
//                 console.log(error)
//             }
//             break;

//         default:
//             break;
//     }
// }

const useCartMutation = () => {
    const { currentUser } = useContext(AppContext)
    const queryClient = useQueryClient()
    const mutatiton = useMutation({
        mutationKey: ['CARTS'],
        mutationFn: async (options: { action: string, newCart: newCart }) => {
            const request = {
                ...options.newCart,
                userId: currentUser._id
            }
            switch (options.action) {
                case 'addtocart':
                    try {

                        const res = await addToCart(request)
                        if (res.status === 200) {
                            toast.success("Thêm giỏ hàng thành công", {
                                position: "top-right",
                                autoClose: 500
                            })
                        }
                    } catch (error) {
                        toast.error("Thêm giỏ hàng thất bại", {
                            position: "top-right",
                            autoClose: 500
                        })
                        console.log(error)
                    }
                    break;
                case 'increase':
                    try {
                        await increaseCart(request)
                    } catch (error) {
                        console.log(error)
                    }
                    break;
                case 'decrease':
                    try {
                        await decreaseCart(request)
                    } catch (error) {
                        console.log(error)
                    }
                    break;
                    case 'updatequantity':
                        try {
                            await updateQuantityCart(request)
                        } catch (error) {
                            console.log(error)
                        }
                        break;
                        
                default:
                    break;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['CARTS'] })
        }
    })
    return mutatiton
}

export default useCartMutation