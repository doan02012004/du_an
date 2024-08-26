/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type Props = {
    setColorsFilter: any,
    colorsFilter: string []
}

const colorsDefault = [
  {
    name:"Đen",
    background:"black"
  },
  {
    name:"Trắng",
    background:"white"
  },
  {
    name:"Vàng",
    background:"yellow"
  },
  {
    name:"Đỏ",
    background:"red"
  },
  {
    name:"Xanh",
    background:"blue"
  },
]
const ColorFilter = ({setColorsFilter,colorsFilter}: Props) => {
    const [colorOptionsVisible, setColorOptionsVisible] = useState(false);
    const [searchParams,] = useSearchParams()
    useEffect(()=>{
      const colorsUrl = searchParams.get('colors')
     if(colorsUrl){
       const getSizeUrl = colorsUrl?.split(',')
       setColorsFilter(getSizeUrl)
     }
   },[searchParams, setColorsFilter])
    const handleColorClick = (color:string) => {
        if(colorsFilter.includes(color)){
            setColorsFilter(colorsFilter.filter((item:string) => item !== color))
          }else{
            setColorsFilter([...colorsFilter, color])
          }
      };
  return (
    <>
     <li className="flex justify-between mt-4">
                  <p className="text-[#221F20]">Màu sắc</p>
                  <p onClick={() => setColorOptionsVisible(!colorOptionsVisible)}><i className={`fa-solid ${colorOptionsVisible ? 'fa-minus' : 'fa-plus'} cursor-pointer`} /></p>
                </li>
                {colorOptionsVisible && (
                  <li id="colorOptions" className="mt-4">
                    <ul className="flex flex-wrap gap-2">
                      {colorsDefault?.map(color => (
                        <li key={color.name}>
                          <button
                            className={`color-btn w-5 h-5 rounded-full relative ${colorsFilter.includes(color.name) ? 'highlighted' : ''}`}
                            onClick={() => handleColorClick(color.name)}
                            style={{ backgroundColor: color.background, borderColor: color.background === 'white' ? 'black' : 'transparent' }}
                          >
                            {colorsFilter.includes(color.name) && (
                              <i className={`fa-solid fa-check absolute inset-0 flex items-center justify-center ${color.background === 'white' ? 'text-black' : 'text-white'}`} />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
    </>
  )
}

export default ColorFilter