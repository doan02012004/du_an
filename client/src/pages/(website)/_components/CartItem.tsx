/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react'
import { Iattribute, Igallery, Iproduct } from '../../../common/interfaces/product'
import { formatPrice } from '../../../common/utils/product'
import { IcartItem } from '../../../common/interfaces/cart'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import useCartMutation from '../../../common/hooks/carts/useCartMutation'
import { toast } from 'react-toastify'

type Props = {
  cart: IcartItem,
  index: number
}

const CartItem = ({ cart }: Props) => {
  const [product, setProduct] = useState(null as Iproduct | null)
  const [attribute, setAttribute] = useState(null as Iattribute | null | any)
  const [gallery, setGallery] = useState(null as Igallery | null | undefined)
  const [isError, setIsError] = useState(false)
  const inputRef = useRef<any>(null)
  const cartMutation = useCartMutation()
  useEffect(() => {
    if (cart.productId) {
      setProduct(cart.productId)

      setIsError(false)
      if (inputRef.current) {
        inputRef.current.value = cart?.quantity
      }
    } else {
      setIsError(true)
    }
  }, [cart, inputRef])
  useEffect(() => {
    if (product) {
      const attribute = product?.attributes?.find((item: Iattribute) => item._id == cart?.attributeId)
      if (attribute) {
        const gallery = product?.gallerys?.find((item: Igallery) => item.name == attribute.color)
        setGallery(gallery)
        setAttribute(attribute)
      }
      else {
        setIsError(true)
      }

    }
  }, [cart?.attributeId, product])
  const onIncreaseMent = () => {
    if (cart.quantity < attribute?.instock) {
      const newCart: any = {
        productId: product?._id,
        attributeId: attribute._id
      }
      cartMutation.mutate({ action: "increase", newCart: newCart })
      
    }else{
      toast.warning("Số lượng đã đạt cực hạn !",{
        position:"top-right",
        autoClose: 400
      })
    }
    
  }
  const onDecreaseMent = () => {
    if (cart.quantity > 0) {
      const newCart: any = {
        productId: product?._id,
        attributeId: attribute._id
      }
      cartMutation.mutate({ action: "decrease", newCart: newCart }) 
    }
    
  }
  const onUpdateQuantity = () =>{
    if(!isNaN(inputRef.current.value) && inputRef.current.value > 0 && inputRef.current.value <= attribute.instock  ){
      const newCart: any = {
        productId: product?._id,
        attributeId: attribute._id,
        quantity:inputRef.current.value
      }
      cartMutation.mutate({ action: "updatequantity", newCart: newCart }) 
    }else{
      inputRef.current.value = cart.quantity
    }
    
  }
  return (
    <div className={`w-full h-[94px] flex gap-3 pb-4  border-b border-gray-200  mb-4 relative `}>
      {isError && (
        <div className=' absolute z-20 top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center '>
          <Button type='primary' danger ><DeleteOutlined /> Xóa Error</Button>
        </div>
      )}
      {
        attribute?.instock === 0 && (
          <div className=' absolute z-20 top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center '>
            <Button type='primary' danger ><DeleteOutlined /> Xóa Instock</Button>
          </div>
        )
      }
      {
        product?.active === false && (
          <div className=' absolute z-20 top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center '>
            <Button type='primary' danger ><DeleteOutlined /> Xóa Active</Button>
          </div>
        )
      }
      <div className="w-16 h-full flex-shrink-0">
        <img src={gallery?.avatar} className="w-full h-full object-cover" />
      </div>
      <div className="w-full flex flex-col justify-between ">
        <h3 className="text-base"><a href="#" className="text-[#373737]">{product?.name}</a></h3>
        <div className="flex justify-between items-center">
          <span className="text-sm ">Màu sắc:
            <span className="text-[#373737]">{attribute?.color}</span>
          </span>
          <span className="text-sm ">Size:
            <span>{attribute?.size}</span>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="relative w-[74px] h-6 border border-gray-200 overflow-hidden rounded-tl-lg rounded-br-lg">
            <span onClick={onDecreaseMent} className="absolute z-[5] cursor-pointer left-0 top-0 w-6 h-full flex justify-center items-center border border-gray-200 rounded-tl-lg rounded-br-lg active:bg-black active:text-white ">
              <i className="fa-solid fa-minus" />
            </span>
            <input onBlur={onUpdateQuantity} ref={inputRef} type="number" className="absolute left-[50%] translate-x-[-50%] w-12 px-3 z-[3] text-center outline-0 border-0" defaultValue={cart?.quantity} />
            <span onClick={onIncreaseMent} className="absolute  z-[5] cursor-pointer right-0 top-0 w-6 h-full flex justify-center items-center border border-gray-200 rounded-tl-lg rounded-br-lg active:bg-black active:text-white ">
              <i className="fa-solid fa-plus" />
            </span>
          </div>
          <span className="text-sm text-[#AC2F33] font-semibold ">{product?.price_new && cart?.quantity && formatPrice((product?.price_new * cart?.quantity))} <span className="underline">đ</span></span>
        </div>
      </div>
    </div>
  )
}

export default CartItem