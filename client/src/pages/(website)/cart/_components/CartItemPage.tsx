/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react'
import { IcartItem } from '../../../../common/interfaces/cart'
import { Iattribute, Igallery, Iproduct } from '../../../../common/interfaces/product'
import useCartMutation from '../../../../common/hooks/carts/useCartMutation'
import { formatPrice } from '../../../../common/utils/product'
import { toast } from 'react-toastify'
import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'

type Props = {
    cart: IcartItem
}

const CartItemPage = ({ cart }: Props) => {
    const [product, setProduct] = useState(null as Iproduct | null)
    const [attribute, setAttribute] = useState(null as Iattribute | null | any)
    const [gallery, setGallery] = useState(null as Igallery | null | undefined)
    const [isError, setIsError] = useState(true)
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

        } else {
            toast.warning("Số lượng đã đạt cực hạn !", {
                position: "top-right",
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
    const onUpdateQuantity = () => {
        if (!isNaN(inputRef.current.value) && inputRef.current.value > 0 && inputRef.current.value <= attribute.instock) {
            const newCart: any = {
                productId: product?._id,
                attributeId: attribute._id,
                quantity: inputRef.current.value
            }
            cartMutation.mutate({ action: "updatequantity", newCart: newCart })
        } else {
            inputRef.current.value = cart.quantity
        }

    }
    return (
        <tr className="border-b border-t *:py-5 relative">
            <td className="w-[27rem]">
                <div className="flex mt-0 pt-0 w-[27rem]">
                    <div className="max-w-40 flex-none ">
                        <a href={`/productdetails/${cart?.productId?._id}`} className='block h-[215px] w-[150px]'>
                            <img src={gallery?.avatar} className='h-full w-full object-cover' />
                        </a>
                    </div>
                    <div className="flex-grow ml-4 p-0 m-0">
                        <span>{product?.name}</span>
                        <div className="flex gap-4 pt-5">
                            <span className="text-[14px]">Màu sắc: {attribute?.color}</span>
                            <span className="text-[14px]">Size: {attribute?.size}</span>
                        </div>
                    </div>
                </div>
            </td>
            <td className="align-top">
                <div className="text-left">
                    <span className='text-sm'>{(product && product?.price_new > 0) ? formatPrice(product?.price_new) : '0'}đ</span>
                    {/* <p className="text-red text-xs font-bold">( -60% )</p> */}
                </div>
            </td>
            <td className="align-top">
                <div className="border grid grid-cols-3 items-center rounded-tl-[20px] rounded-br-[20px] w-max">
                    <button onClick={onDecreaseMent} className=" border border-t-0 border-l-0 border-b-0 rounded-tl-[20px] rounded-br-[20px] py-1 px-2 text-lg">-</button>
                    <input onBlur={onUpdateQuantity} ref={inputRef} className="text-center text-xs w-12 h-full border-transparent outline-0" defaultValue={cart?.quantity} />
                    <button onClick={onIncreaseMent} className=" border border-t-0 border-r-0 border-b-0 rounded-tl-[20px] rounded-br-[20px] py-1 px-2 text-lg">+</button>
                </div>
            </td>
            <td className="align-top">
                <div className=''>
                    <span className="text-black font-bold text-sm pl-4">{(product && cart?.total > 0) ? formatPrice(cart?.total) : '0'}đ</span>
                </div>
            </td>
            <td className="align-top">
                <img />
            </td>
        </tr>
    )
}

export default CartItemPage