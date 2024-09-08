import { createSlice } from "@reduxjs/toolkit"
import { IcartItem } from "../../interfaces/cart"

const initialState = {
   carts:[] as IcartItem[],
   totalPrice: 0,
   totalCart: 0
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        setTotalPrice: (state,action)=>{
            state.totalPrice =action.payload
        },
        setTotalCart: (state,action)=>{
            state.totalCart =action.payload
        },
        setCarts:(state,action)=>{
            state.carts = action.payload
        }
    }
})

export const {setTotalPrice,setCarts,setTotalCart} = cartSlice.actions

export default cartSlice.reducer