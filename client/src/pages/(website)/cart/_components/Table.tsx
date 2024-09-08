
import { IcartItem } from '../../../../common/interfaces/cart'
import CartItemPage from './CartItemPage'

type Props = {
    carts: IcartItem[]
}
const Table = ({carts}:Props) => {
    return (
        <div>
            <div className="hidden lg:block">
                <table className="lg:w-full">
                    <thead>
                        <tr className="*:pb-5">
                            <th className="text-left text-[12px] ">TÊN SẢN PHẨM</th>
                            <th className="text-[12px] text-left">CHIẾT KHẤU</th>
                            <th className="text-[12px] text-left">SỐ LƯỢNG</th>
                            <th className="text-[12px] text-left pl-4">TỔNG GIÁ</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                     {carts?.map((item:IcartItem) => (
                          <CartItemPage key={item.attributeId} cart={item} />
                     ))}
                    </tbody>
                </table>
            </div>
            <div className="lg:hidden flex justify-between">
                <div className="flex gap-4 w-2/3">
                    <div className="">
                        <a href='' className='block h-[103px] w-[72px]'>
                            <img src="https://picsum.photos/200/1000" className='h-full w-full object-cover' />
                        </a>
                    </div>
                    <div className="flex flex-col gap-[6px]">
                        <span className="text-sm">Áo thun dino saurs</span>
                        <div className="flex gap-2 text-sm">
                            <span>Màu sắc: Trắng</span>
                            <span>Size: S</span>
                        </div>
                        <div className="flex flex-col">
                            <span>89.00đ</span>
                            <span className="text-sm text-red font-semibold">( -30% )</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-10">
                    <span><i className="fa-solid fa-trash-can" /></span>
                    <div className="border grid grid-cols-3 items-center rounded-tl-[10px] rounded-br-[10px]">
                        <button className=" border border-t-0 border-l-0 border-b-0 rounded-tl-[10px] rounded-br-[10px] px-2 text-xl">-</button>
                        <span className="text-center">1</span>
                        <button className=" border border-t-0 border-r-0 border-b-0 rounded-tl-[10px] rounded-br-[10px]  px-2 text-xl">+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table