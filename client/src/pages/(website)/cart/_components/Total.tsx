/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux"
import { formatPrice } from "../../../../common/utils/product"

const Total = () => {
    const totalPrice = useSelector((state:any) => state.cart.totalPrice)
    const totalCart = useSelector((state:any) => state.cart.totalCart)
  return (
    <div className="bg-[#FBFBFC]">
                            <div className="px-5 pt-4 pb-8 flex flex-col gap-4">
                                <span className="text-xl text-[#000000] font-medium">Tổng tiền giỏ hàng</span>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Tổng sản phẩm</span>
                                    <span className="text-sm">{totalCart}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Tổng tiền hàng</span>
                                    <span className="text-sm">{totalPrice !== 0 ? formatPrice(totalPrice) : 0 }đ</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Thành tiền</span>
                                    <span className="text-lg text-dark font-semibold">{totalPrice !== 0 ? formatPrice(totalPrice) : 0 }đ</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-5">
                                    <span className="text-sm">Tạm tính</span>
                                    <span className="text-lg text-dark font-semibold">{totalPrice !== 0 ? formatPrice(totalPrice) : 0 }đ</span>
                                </div>
                                <div>
                                    <span className="text-red"><i className="fa-solid fa-circle-exclamation" /></span>
                                    <span className="text-red text-sm">Miễn <strong>đổi trả</strong> đối với sản phẩm đồng giá / sale trên 50%</span>
                                </div>
                            </div>
                        </div>
  )
}

export default Total