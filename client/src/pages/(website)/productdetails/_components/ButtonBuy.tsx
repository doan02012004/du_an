import { toast } from "react-toastify"
import { Iproduct } from "../../../../common/interfaces/product"


type Props = {
    product:Iproduct
    quantity:number,
    attributeId:number|string|null|undefined
}
const ButtonBuy = ({product,quantity,attributeId}:Props) => {

    const onAddToCart = () =>{
        const newCart = {
            productId:product?._id,
            attributeId,
            quantity
        }
        if(!attributeId){
          return  toast.error("Vui lòng chọn size",{
                position:"top-right"
            })
        }
       
        
    }
    return (
        <div className="product-detail__actions flex lg:mt-[24px] mb-4 mt-4">
            <button onClick={onAddToCart} className="add-to-cart hover:text-black hover:bg-white border-black border  w-[160px] h-[48px] bg-[#221f20] text-white lg:text-[16px] text-[13px] px-4 font-semibold lg:mr-[10px] mr-1
        rounded-tl-2xl rounded-br-2xl">THÊM VÀO GIỎ</button>
            <button className="buy-now hover:text-white hover:bg-black w-[125px] lg:text-[16px] text-[13px] rounded-tl-2xl rounded-br-2xl border border-black h-[48px] text-black font-semibold mx-4">MUA HÀNG</button>
            <button className="h-[48px] w-[48px] hover:text-white hover:bg-black border border-black rounded-tl-2xl rounded-br-2xl"><i className="fa-regular fa-heart" /></button>
        </div>
    )
}

export default ButtonBuy