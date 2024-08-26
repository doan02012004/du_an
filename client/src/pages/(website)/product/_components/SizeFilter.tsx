/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

type Props = {
    setSizesFilter: any,
    sizesFilter: string []
}
const SizeFilter = ({setSizesFilter,sizesFilter}:Props) => {
    const [sizeOptionsVisible, setSizeOptionsVisible] = useState(false);
    const [searchParams,] = useSearchParams()
    useEffect(()=>{
       const sizesUrl = searchParams.get('sizes')
      if(sizesUrl){
        const getSizeUrl = sizesUrl?.split(',')
        setSizesFilter(getSizeUrl)
      }
    },[searchParams, setSizesFilter])
    const handleSizeClick = (size:string) => {
        if(sizesFilter.includes(size)){
          setSizesFilter(sizesFilter.filter((item:string) => item !== size))
        }else{
          setSizesFilter([...sizesFilter, size])
        }
      };
  return (
    <>
     <li className="flex justify-between">
                  <p className="text-[#221F20]">Size</p>
                  <p onClick={() => setSizeOptionsVisible(!sizeOptionsVisible)}><i className={`fa-solid ${sizeOptionsVisible ? 'fa-minus' : 'fa-plus'} cursor-pointer`} /></p>
                </li>
                {sizeOptionsVisible && (
                  <li id="sizeOptions" className="mt-4">
                    <ul className="flex flex-wrap gap-3">
                      {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                        <li key={size}>
                          <button
                            className={`size-btn text-[12px] px-4 py-2 border rounded ${sizesFilter?.includes(size) && 'highlighted'}`}
                            onClick={() => handleSizeClick(size)}
                            style={{ borderRadius: '10px 0px' }}
                          >
                            {size}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
    </>
  )
}

export default SizeFilter