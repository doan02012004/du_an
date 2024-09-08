/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "../common/config/axios"

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