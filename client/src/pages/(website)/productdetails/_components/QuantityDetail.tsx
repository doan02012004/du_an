/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useRef, useState } from 'react'
import { Iattribute, Iproduct } from '../../../../common/interfaces/product'
import { toast } from 'react-toastify'

type Props = {
    product:Iproduct,
    attributeId:string|number|null|undefined,
    setQuantity:any
}

const QuantityDetail = ({product,attributeId,setQuantity}: Props) => {
    const [attribute,setAttribute] = useState({} as Iattribute)
    const [beforeQuantity,setBeforeQuantity] = useState(1)
    const inputRef = useRef<any>(null)
    useEffect(()=>{
        if(product && attributeId){
            const attribute:Iattribute|any = product?.attributes.find((item:Iattribute) => item._id == attributeId)
            setAttribute(attribute)
            inputRef.current.value = 1
        }
    },[attributeId,product,inputRef])
    const onChangeInput = (event:any) =>{
        const value = event.target.value
        if(!attributeId){
            toast.error("Vui lòng chọn size",{
                position: 'top-right',
                autoClose:3000
            })
        }
        if(Number(value) <= attribute.instock){
            setBeforeQuantity(value)
            setQuantity(value)
        }
       if(Number(value) > attribute.instock){
        toast.error("Số lượng đã vượt giới hạn",{
            position: 'top-right'
        })
        inputRef.current.value = beforeQuantity
       }
        // toast.success("Đang nhập input",{
        //     position: 'top-right',
        //     autoClose:2000
        // })
    }
    const onBlurInput = (event:any) =>{
        const value = event.target.value;
        if(value == ''){
           setQuantity(1)
        }
        if(Number(value) < 1 ){
           setBeforeQuantity(1)
            inputRef.current.value = 1
            setQuantity(1)
        }
    }
    const onIncrement = () =>{
        const value =  inputRef.current.value;
        if(Number(value) <= attribute.instock){
            setBeforeQuantity(value)
            setQuantity(Number(value)+1)
            inputRef.current.value = Number(value) + 1
        }
        else{
            toast.error("Đã đạt số lượng tối đa",{
                position: 'top-right',
            })
        }
    }   
    const onDecrement = () =>{
        const value =  inputRef.current.value;
        if(Number(value) > 1){
            setBeforeQuantity(value)
            setQuantity(Number(value)-1)
            inputRef.current.value = Number(value) - 1
        }
        else{
            toast.error("Không thể giảm thêm số lượng",{
                position: 'top-right',
            })
        }
    } 
  return (
    <div className="product-detail__quantity flex items-center">
    <h3 className="lg:text-[19px] text-[19px] font-semibold mr-4">Số lượng:</h3>
    <div className="quantity-control flex border lg:rounded-tl-2xl lg:rounded-br-2xl rounded-tl-md rounded-br-md mt-[-12px] lg:mt-0  ">
        <button onClick={onDecrement} className="quantity-decrease lg:w-[55px] lg:h-[54px] w-8 h-8 border flex items-center justify-center mr-[5px] lg:rounded-tl-2xl lg:rounded-br-2xl rounded-tl-md rounded-br-md">-</button>
        <input ref={inputRef} type="number" onBlur={(event)=>onBlurInput(event)} onChange={(event) => onChangeInput(event)} className="quantity-input outline-0 lg:w-[60px] lg:h-[54px] w-8 h-8  text-center" defaultValue={1} min={1} />
        <button onClick={onIncrement} className="quantity-increase lg:w-[55px] lg:h-[54px] w-8 h-8 border flex items-center justify-center ml-[5px] lg:rounded-tl-2xl lg:rounded-br-2xl rounded-tl-md rounded-br-md">+</button>
    </div>
</div>
  )
}

export default QuantityDetail