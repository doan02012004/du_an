/* eslint-disable @typescript-eslint/no-explicit-any */
import { Slider } from 'antd'
import  { useState } from 'react'
type Props = {
    price: number[],
    setPrice: any
}
const PriceFilter = ({price,setPrice}:Props) => {
    const [priceOptionsVisible, setPriceOptionsVisible] = useState(false);
    // const [searchParams,setSearchParams] = useSearchParams()

  return (
    <>
         <li className="flex justify-between mt-4">
                  <p className="text-[#221F20]">Mức giá</p>
                  <p onClick={() => setPriceOptionsVisible(!priceOptionsVisible)}><i className={`fa-solid ${priceOptionsVisible ? 'fa-minus' : 'fa-plus'} cursor-pointer`} /></p>
                </li>
                {priceOptionsVisible && (
                  <li id="priceOptions" className="mt-4">
                    <Slider<any>
                      range
                      min={0}
                      max={2000000}
                      value={price}
                      onChange={(value) => setPrice(value)}
                      className="price-slider"
                      trackStyle={{ backgroundColor: '#000' }} // Track color
                      handleStyle={{ borderColor: '#000', backgroundColor: '#000' }} // Handle color
                    />
                    <div className="flex justify-between mt-2">
                      <span id="minPrice">{price[0]}đ</span>
                      <span id="maxPrice">{price[1]}đ</span>
                    </div>
                  </li>
                )}
    </>
  )
}

export default PriceFilter