
export const formatPrice = (price?: number|null) =>{
   if(price){
    return price.toLocaleString('vi-VN')
   }
}

export const priceNew = (priceOld:number,discount:number) =>{
    const newPrice = priceOld - (priceOld * discount / 100)
    return newPrice
}