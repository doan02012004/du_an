/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Product_description from './Product_description'
import { Iattribute, Iproduct } from '../../../../common/interfaces/product'
import { formatPrice } from '../../../../common/utils/product'
import { IColor } from '../../../../common/interfaces/Color'
import { useEffect, useState } from 'react'
import QuantityDetail from './QuantityDetail'
import ButtonBuy from './ButtonBuy'

type Props = {
    product: Iproduct
    color: string
    setColor: any
}

const Product_information = ({ product, color,setColor }: Props) => {
    const [attributes,setAttributes] = useState([] as Iattribute[])
    const [attributeId,setAttributeId] = useState(null as string|number|null|undefined)
    const [checkFreesize,setCheckFreesize] = useState(false)
    const [quantity,setQuantity] = useState(1 as number)
    useEffect(()=>{
        if(color){
            const newAttributes = product?.attributes?.filter((item:Iattribute)=> item.color == color)
            setAttributes(newAttributes)
        }
    },[color, product?.attributes])
    useEffect(()=>{
        if(product?.sizes){
            setCheckFreesize(product?.sizes?.includes('FREESIZE'))
        }
    },[product?.sizes])
    useEffect(()=>{
     
        if(checkFreesize == true){
              const attribute:Iattribute|any = product?.attributes?.find((item:Iattribute)=> item.color == color)
        setAttributeId(attribute._id)
        }else{
            setAttributeId(null)
        }
    },[checkFreesize,color])
    console.log(quantity)
    return (
        <>
            <div className="lg:pl-[112px]">
                <div className="lg:mb-[20px] mt-[10px] lg:mt-0">
                    <h1 className="lg:text-[32px] text-[18px] font-semibold text-[#221f20]">{product?.name}</h1>
                </div>
                {/*  */}
                <div className="lg:flex lg:text-[18px] lg:mb-[28px] text-[14px] mt-4 lg:mt-0 ">
                    <p>SKU: <span>57E3930</span></p>
                    <div className="lg:ml-[34px] mr-[17px] inline-block">
                        <i className="fa-solid fa-star text-[#EEB256]" />
                        <i className="fa-solid fa-star text-[#EEB256]" />
                        <i className="fa-solid fa-star text-[#EEB256]" />
                        <i className="fa-solid fa-star text-[#EEB256]" />
                        <i className="fa-solid fa-star text-[#EEB256]" />
                    </div>
                    <p className='inline-block'>(0 đánh giá)</p>
                </div>
                {/*  */}
                <div className="flex lg:mb-[24px] mt-4 lg:mt-0 mb-4">
                    <b className="lg:text-[27px] text-[18px] font-semibold">{product?.price_new && formatPrice(product?.price_new)}đ</b>
                    <del className="lg:mt-2 mt-[6px] lg:text-[18px] text-[12px] ml-[9px] text-[#a8a9ad]">{product?.price_old && formatPrice(product?.price_old)}đ</del>
                    <div className="product-detail__price-sale ml-[11px]  font-semibold text-[15px] text-white border bg-[#dc633a] h-[23px] px-2 mt-[-12px] lg:mt-0 pt-[2px]">
                        -50<span>%</span>
                    </div>
                </div>
                {/*  */}
                <div className="">
                    <div className="text-[16px]">
                        <h3 className="lg:text-2xl font-semibold">Màu sắc: <span id="selected-color">{color}</span></h3>
                        <div className="color-options flex lg:mt-4 lg:text-[16px] mt-2">
                            {product?.colors?.map((item: IColor, index: number) => (
                                <div key={index+1} onClick={() =>setColor(item.name)} className="color-option cursor-pointer lg:w-6 lg:h-6 w-5 h-5 border rounded-full mr-4 relative" data-color="Đen" style={{background:item.background}}>
                                    {item.name == color && (
                                          <span className={`${item.name.includes('TRẮNG')? 'text-black' : 'text-white'} check-icon  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}><i className="fas fa-check" /></span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/*  */}
                    <div className="product-detail__size">
                        <div className="size-options flex mt-[24px] mb-[12px]">
                            { checkFreesize == false &&  attributes?.map((item:Iattribute,index:number)=>(
                                 <div key={index+1} onClick={()=> item.instock > 0 && setAttributeId(item._id)} className={` ${item?._id == attributeId && 'border-black'} size-option cursor-pointer lg:w-[54px] lg:h-[37px] w-[48px] h-[32px] border overflow-hidden flex items-center justify-center lg:mr-[14px] mr-3 relative`}>
                                    {item?.size}
                                   {item.instock == 0 && (
                                     <div className=' absolute top-0 left-0 w-full h-full flex justify-center items-center'>
                                     <div className='block rotate-[62deg] w-px h-10 lg:h-11 bg-slate-600'></div>
                                 </div>
                                   )}
                                </div>
                            ))}
                        </div>
                        <div className="mb-6">
                            <i className="fa-solid fa-ruler" /><span className="ml-[10px] lg:text-[14px] text-[12px] text-[#373737]">Kiểm tra size của bạn</span>
                        </div>
                    </div>
                    {/*  */}
                        <QuantityDetail product={product} attributeId={attributeId} setQuantity={setQuantity} />
                    {/*  */}
                  <ButtonBuy product={product} attributeId={attributeId} quantity={quantity} />
                    {/*  */}
                    <div>
                        <a href="#" className="text-lg text-black border-b border-black hover:no-underline text-[14px]">Tìm tại cửa hàng</a>
                    </div>
                    <div className="product-detail-divider mt-[57px] mb-[45px]">
                        <hr />
                    </div>
                    {/*  */}
                    <Product_description />
                    {/*  */}
                </div>
            </div>
        </>
    )
}

export default Product_information