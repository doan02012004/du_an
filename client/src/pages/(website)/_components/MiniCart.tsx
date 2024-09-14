/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react'
import CartItem from './CartItem';
import { formatPrice } from '../../../common/utils/product';
import { IcartItem } from '../../../common/interfaces/cart';
import { useDispatch, useSelector } from 'react-redux';
import {  setTotalCart } from '../../../common/redux/features/cartSlice';

import { AppContext } from '../../../common/contexts/AppContextProvider';

const MiniCart = () => {
    const [isOpenCart, setIsOpenCart] = useState(false)
    const {isLogin,carts} = useContext(AppContext)
    const totalCart = useSelector((state:any) => state.cart.totalCart)
    const dispatch = useDispatch()
    const onMiniCart = () => {
        const miniCart = document.querySelector<HTMLElement>('.mini-cart');
        if (isOpenCart == true) {
            if (miniCart) {
                miniCart.style.right = '-100%';
                miniCart.style.opacity = '0';
            }
        }
        else {
            if (miniCart) {
                miniCart.style.right = '0';
                miniCart.style.opacity = '1';
            }
        }
        setIsOpenCart(!isOpenCart)
    }
    useEffect(()=>{
        if(carts?.items?.length > 0){
            const newTotalCart = carts?.items?.reduce((total:number, item:IcartItem) => Number(total + item.quantity), 0 )
            dispatch(setTotalCart(newTotalCart))
        }else{
            dispatch(setTotalCart(0))
        }
    },[carts])
    return (
        <div className="relative pr-5">
            <span onClick={onMiniCart} className="block open-mini-cart cursor-pointer text-base hover:text-gray-800 ">
                <i className="fa-solid fa-cart-shopping" />
            </span>
            <span className="absolute -top-1 right-0 flex justify-center items-center text-sm size-4 rounded-full bg-black text-white">{totalCart}</span>
            {/* Mini cart  */}
            <div className="mini-cart fixed top-0 -right-full opacity-0 h-screen min-w-full lg:min-w-[390px] bg-white border border-gray-200 z-[15] transition-all duration-500 ease-in-out">
                <div className="flex items-center justify-between px-[15px]  pt-6 pb-5 border-b border-gray-200 mb-6 lg:px-6">
                    <h1 className="text-xl font-semibold flex items-center">Giỏ hàng
                        <span className="ml-[10px] size-6 bg-black text-white text-sm rounded-full flex justify-center items-center">{totalCart}</span>
                    </h1>
                    <span onClick={onMiniCart} className="close-mini-cart cursor-pointer text-2xl">
                        <i className="fa-solid fa-xmark" />
                    </span>
                </div>
                <div className={`px-6 h-main_mini_cart overflow-y-auto scrollbar mb-6 ${(isLogin == false || isLogin == null)? "lg:mb-4 ":"lg:mb-12"}`}>
                    {/* cart item  */}
                    {carts?.items?.map((item:any,index:number) => (
                        <CartItem cart={item} key={item.attributeId} index={index} />
                    ))}

{/*                    
                    <div className="w-full h-[94px] flex gap-3 pb-4 border-b border-gray-200  mb-4  ">
                        <div className="w-16 h-full flex-shrink-0">
                            <img src="./assets/images/products/aonam2.jpg" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-full flex flex-col justify-between ">
                            <h3 className="text-base"><a href="#" className="text-[#373737]">Áo sơ mi nam</a></h3>
                            <div className="flex justify-between items-center">
                                <span className="text-sm ">Màu sắc:
                                    <span className="text-[#373737]">Xanh tím than</span>
                                </span>
                                <span className="text-sm ">Size:
                                    <span>Xl</span>
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="relative w-[74px] h-6 border border-gray-200 overflow-hidden rounded-tl-lg rounded-br-lg">
                                    <span className="absolute z-[5] cursor-pointer left-0 top-0 w-6 h-full flex justify-center items-center border border-gray-200 rounded-tl-lg rounded-br-lg active:bg-black active:text-white ">
                                        <i className="fa-solid fa-minus" />
                                    </span>
                                    <input type="number" className="absolute left-[50%] translate-x-[-50%] w-12 px-3 z-[3] text-center outline-0 border-0" defaultValue={1} />
                                    <span className="absolute z-[5] cursor-pointer right-0 top-0 w-6 h-full flex justify-center items-center border border-gray-200 rounded-tl-lg rounded-br-lg active:bg-black active:text-white ">
                                        <i className="fa-solid fa-plus" />
                                    </span>
                                </div>
                                <span className="text-sm text-[#AC2F33] font-semibold ">299.000 <span className="underline">đ</span></span>
                            </div>
                        </div>
                    </div> */}
                   
                </div>
                <div >
                    <p className="text-right px-6 pb-3 mb-3 border-b border-gray-200">Tổng cộng: <span className="text-lg font-semibold text-[#0A0A0B]">{carts?.total !== 0 ? formatPrice(carts?.total) : 0 } đ</span></p>
                    <div className="px-6">
                        <a href='/cart' className="block mb-3 w-full py-4 bg-black border border-black uppercase font-semibold text-lg  text-center text-white transition duration-300 ease-in-out hover:bg-white hover:text-black ">Xem
                            giỏ hàng
                        </a>
                      {(isLogin == false || isLogin == null) && (
                         <a href='/signin' className="block mb-3 w-full py-4 text-gray-600 border border-black uppercase font-semibold text-lg  text-center  transition duration-300 ease-in-out hover:bg-black hover:text-white ">
                        Đăng nhập
                     </a>
                      )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiniCart