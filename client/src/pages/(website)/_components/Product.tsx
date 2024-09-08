/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Iattribute, Igallery, Iproduct } from '../../../common/interfaces/product'
import { formatPrice } from '../../../common/utils/product'
import { IColor } from '../../../common/interfaces/Color'
import { useDispatch, useSelector } from 'react-redux'
import { setProductId } from '../../../common/redux/features/productSlice'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import useCartMutation from '../../../common/hooks/carts/useCartMutation'

type Props = {
  product: Iproduct
}

const Product = ({ product }: Props) => {
  const [isOpenSize, setIsOpenSize] = useState(false)
  const [gallery, setGallery] = useState({} as Igallery)
  const [color, setColor] = useState('' as string)
  const [checkSizes, setCheckSizes] = useState([] as string[])
  const productId = useSelector((state: any) => state.product.productId)
  const cartMutation = useCartMutation()
  const dispath = useDispatch()
  useEffect(()=>{
    if(productId == null){
      setIsOpenSize(false)
    }
  },[productId])
  useEffect(() => {
    setGallery(product?.gallerys[0])
    setColor(product.gallerys[0].name)
  }, [product])
  useEffect(() => {
    const newAttributes = product?.attributes?.filter((item: Iattribute) => (item.color == color && item.instock > 0))
    const newCheckSizes = newAttributes?.map((item:Iattribute) => item.size)
    // console.log(newCheckSizes)
    setCheckSizes(newCheckSizes)
  }, [color])
  const onSetProductId = async(product:Iproduct) =>{
    if(productId !== product?._id){
      dispath(setProductId(product._id))
      setIsOpenSize(true)
    }
    if(productId == product?._id && isOpenSize == false){
      await dispath(setProductId(null))
      dispath(setProductId(product._id))
      setIsOpenSize(true)
    }
    if(productId == product?._id && isOpenSize == true){
      dispath(setProductId(null))
    }
  }
  const onPickColor = (item: IColor) => {
    setColor(item.name)
    const newGallery: Igallery | any = product?.gallerys.find((gallery: Igallery) => gallery.name == item.name)
    setGallery(newGallery)
  }
  const addToCart = async(size:string) =>{
    // console.log(size)
    const attribute = await product?.attributes?.find((item:Iattribute) => (item.color == color && item.size == size))
    toast.success("Đã thêm vào giỏ hàng")
    console.log("cartItem >>:", {productId, attributeId:attribute?._id ,quantity:1})
    const newCart =  {productId, attributeId:attribute?._id ,quantity:1}
    cartMutation.mutate({action:"addtocart",newCart:newCart})
  }
  return (
    <>
      <div>
        <div className="h-[236px] lg:h-[350px] w-full relative overflow-hidden mb-4">
          <Link to={`/productdetails/${product._id}`} className="block w-full h-full">
            <img src={gallery?.avatar} className="w-full h-full object-cover" />
          </Link>
          <span className="absolute top-0 left-0 text-[12px]/[150%] font-semibold py-1 px-3 bg-rose-900 text-white rounded-br-full">
            Best seller
          </span>
          {
            product?.discount !== 0 && (
              <span className="absolute size-6 lg:size-10 rounded-full top-2 right-2 text-[12px]/[150%] font-semibold bg-black text-white flex justify-center items-center">
                {product?.discount}%
              </span>
            )
          }
        </div>
        <div className="flex justify-between mb-2 lg:mb-3">
          <ul className="flex items-center gap-x-[10px]">
            {
              product?.colors?.map((item: IColor, index: number) => (
                <li key={index} onClick={() => onPickColor(item)} className={`cursor-pointer border size-4 ${item.name == 'TRẮNG' ? 'text-black' : 'text-white'} lg:size-[18px] rounded-full font-thin text-sm flex items-center justify-center`} style={{ background: item.background }}>
                  {item.name == gallery?.name && (<i className="fa-solid fa-check" />)}
                </li>
              ))
            }
            {/* <li className="cursor-pointer size-4 text-white lg:size-[18px] rounded-full bg-black font-thin text-sm flex items-center justify-center">
              <i className="fa-solid fa-check" />
            </li>
            <li className="cursor-pointer size-4 text-white lg:size-[18px] rounded-full bg-black font-thin text-sm flex items-center justify-center">
              <i className="fa-solid fa-check" />
            </li>
            <li className="cursor-pointer size-4 text-white lg:size-[18px] rounded-full bg-black font-thin text-sm flex items-center justify-center">
              <i className="fa-solid fa-check" />
            </li>
            <li className="cursor-pointer size-4 text-white lg:size-[18px] rounded-full bg-black font-thin text-sm flex items-center justify-center">
              <i className="fa-solid fa-check" />
            </li> */}
          </ul>
          <span className=" cursor-pointer text-sm font-thin text-black ">
            <i className="fa-regular fa-heart" />
          </span>
        </div>
        <a href="#" className="block text-[12px]/[16px] lg:text-sm hover:text-rose-800 mb-2 lg:mb-[10px]">{product?.name}</a>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className=" text-sm font-semibold text-dark lg:text-base">{formatPrice(product?.price_new)}đ</span>
            <span className=" text-[10px]/[150%] line-through lg:text-[12px]/[150%]">{formatPrice(product?.price_old)}đ</span>
          </div>
          <div className="relative btn-cart">
            <button onClick={() => onSetProductId(product)} className="card-add-to-cart size-5 text-[12px] border-dark border bg-dark rounded-tl-lg rounded-br-lg text-white transition duration-500 ease-in-out hover:bg-white lg:text-base hover:text-black lg:size-8">
              <i className="fa-solid fa-cart-arrow-down" />
            </button>
            {product?._id == productId && isOpenSize == true && (
              <ul className="card-list-size w-[100px] absolute bottom-[35px]  transition-all duration-300 ease-in-out right-0 bg-white lg:w-[132px] border border-gray-200 z-10">
                {
                  product?.sizes.map((item: string) => (
                    <li key={item}>
                      <button onClick={()=> addToCart(item)} disabled={!checkSizes.includes(item)} className={`${!checkSizes.includes(item)? 'text-gray-300' : 'text-dark hover:border-dark '} w-full text-sm py-2  font-semibold border border-white lg:text-base lg:py-3 `}>{item}</button>
                    </li>
                  ))
                }
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Product