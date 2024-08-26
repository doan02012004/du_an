/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from 'react'
import SizeFilter from './SizeFilter';
import ColorFilter from './ColorFilter';
import PriceFilter from './PriceFilter';
import { useSearchParams } from 'react-router-dom';


const Sidebar_prod = () => {
  const [sizesFilter,setSizesFilter] = useState([] as string[])
  const [colorsFilter,setColorsFilter] = useState([] as string[])
  const [price, setPrice] = useState([0, 2000000]);
  const [searchParams,setSearchParams] = useSearchParams()
  const handleReset = () => {
    setPrice([0, 10000000]);
  };

  const handleApply = () => {
    searchParams.set('slug','')
    searchParams.set('page','1')
    searchParams.set('search','')
    searchParams.set('sizes',sizesFilter.join())
    searchParams.set('colors',colorsFilter.join())
    searchParams.set('minPrice',`${price[0]}`)
    searchParams.set('maxPrice',`${price[1]}`)
    searchParams.set('sell_orders','')

    setSearchParams(searchParams)
  };
  return (
    <>
        <div className="sidebar-prod sidebar-prod-pc hidden flex-shrink-0 lg:block lg:w-[230px] lg:mr-[33px] lg:pl-[15px]">
            <div className="filter-by-side">
              <ul>
               <SizeFilter sizesFilter={sizesFilter} setSizesFilter={setSizesFilter} />
                <hr className="mt-[21px] mb-[15px] text-[#F7F8F9]" />
               <ColorFilter setColorsFilter={setColorsFilter} colorsFilter={colorsFilter} />
                <hr className="mt-[21px] mb-[15px] text-[#F7F8F9]" />
               <PriceFilter setPrice={setPrice} price={price} />
                <hr className="mt-[21px] mb-[33px] text-[#F7F8F9]" />
                <li className="flex justify-around mt-4">
                  <button onClick={handleReset} className="px-2 py-2 border rounded bg-white text-black w-20" style={{ borderRadius: '17px 0px 17px 0px' }}>Bỏ Lọc</button>
                  <button onClick={handleApply} className="px-4 py-2 border rounded bg-black text-white w-20" style={{ borderRadius: '17px 0px 17px 0px' }}>Lọc</button>
                </li>
              </ul>
            </div>
          </div>
    </>
  )
}

export default Sidebar_prod