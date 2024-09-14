/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "../common/config/axios"
import { Icart, IcartItem } from "../common/interfaces/cart"
import { Iproduct } from "../common/interfaces/product"
import { setCarts } from "../common/redux/features/cartSlice"

export const addToCart = async (option:{userId:string|any,productId:string|any,attributeId?:string|any, quantity?:number|any})=>{
    try {
        const cart = {
            productId:option.productId,
            attributeId:option.attributeId,
            quantity:option.quantity
        }
      const res  =  await instance.post(`/carts/addtocart/${option.userId}`,cart)
      return res.data
    } catch (error) {
        console.log(error)
    }
}
export const addToCartLocal = async (option:{productId:Iproduct,attributeId?:string|any, quantity?:number|any,carts:Icart,setCarts:any})=>{

    const cart = {
        productId:option.productId,
        attributeId :  option.attributeId,
         quantity : option.quantity
    }
    const cartLocal = {
        ...option.carts
    }
    if(cartLocal.items.length == 0){
        cartLocal.items.push({
            ...cart,
             totalPrice:Number(cart.productId?.price_new * cart.quantity)
         })
         cartLocal.total = Number(cart.productId?.price_new * cart.quantity)
         return cartLocal
    }
    const checkCartItem =  cartLocal.items.find((item:IcartItem) => (item.productId._id == option.productId._id && item.attributeId == option.attributeId))
    if(!checkCartItem){
        cartLocal.items.push({
           ...cart,
            totalPrice:Number(cart.productId?.price_new * cart.quantity)
        })
        const sumTotal = cartLocal.items.reduce((sum,cartItem) => sum + cartItem.totalPrice,0)
        cartLocal.total = sumTotal
        return cartLocal
    }else{
        checkCartItem.quantity = Number(checkCartItem.quantity + cart.quantity)
        checkCartItem.totalPrice = Number(cart.productId.price_new * checkCartItem.quantity)
        const newCartLocal =  await cartLocal.items.map((item:IcartItem) => (item.productId._id == checkCartItem.productId._id && item.attributeId == checkCartItem.attributeId)? checkCartItem: item)
        cartLocal.items = newCartLocal
       
        const sumTotal = cartLocal.items.reduce((sum,cartItem) => sum + cartItem.totalPrice,0)
        cartLocal.total = sumTotal
        return cartLocal
    }
}

export const getCart = async(userId:string) =>{
    try {
        const res = await instance.get(`/carts/${userId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const increaseCart = async (option:{userId:string|any,productId:string|any,attributeId?:string|any})=>{
    try {
        const cart = {
            productId:option.productId,
            attributeId:option.attributeId,
        }
      const res  =  await instance.post(`/carts/increase/${option.userId}`,cart)
      return res
    } catch (error) {
        console.log(error)
    }
}

export const decreaseCart = async (option:{userId:string|any,productId:string|any,attributeId?:string|any})=>{
    try {
        const cart = {
            productId:option.productId,
            attributeId:option.attributeId,
        }
      const res  =  await instance.post(`/carts/decrease/${option.userId}`,cart)
      return res
    } catch (error) {
        console.log(error)
    }
}
export const updateQuantityCart = async (option:{userId:string|any,productId:string|any,attributeId?:string|any, quantity?:number|any})=>{
    try {
        const cart = {
            productId:option.productId,
            attributeId:option.attributeId,
            quantity:option.quantity
        }
      const res  =  await instance.post(`/carts/update/quantity/${option.userId}`,cart)
      return res.data
    } catch (error) {
        console.log(error)
    }
}