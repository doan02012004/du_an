import { Iproduct } from "./product"

export interface Icart {
    userId?:string,
    _id?:string,
    items:IcartItem[],
    total: number
}

export interface  IcartItem {
    productId:Iproduct,
    attributeId: string,
    quantity: number,
    totalPrice:number
}