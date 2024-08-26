/* eslint-disable @typescript-eslint/no-explicit-any */
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { useEffect, useRef, useState } from 'react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Igallery, Iproduct } from '../../../../common/interfaces/product';

type Props = {
    product: Iproduct,
    color:string,
}

const Slider_product_details = ({ product,color }: Props) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth);
    const [oneGallery,setOneGallery] = useState([] as string[])
    const imageRef = useRef(null as any)

    useEffect(() => {
        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth)
        })
    }, []);
    useEffect(()=>{
        if(color){
        const galleryItem = product?.gallerys.find((item:Igallery) => item.name == color)
        if(galleryItem){
            setOneGallery([galleryItem.avatar, ... galleryItem.items])
        }
        }
        if(imageRef && imageRef.current.swiper){
            imageRef.current.swiper.slideTo(0)
        }
        
    },[color,product])
    const onChangeImage = (index:number) =>{
        if(imageRef && imageRef.current.swiper){
            imageRef.current.swiper.slideTo(index)
        }
    }
    return (
        <>
            <div className='lg:flex lg:justify-between'>
                <div className='w-full lg:w-[485px] lg:h-[729px]'>
                    <Swiper
                        modules={[Navigation, Pagination, EffectFade]}
                        effect='fade'
                        slidesPerView={1}
                        navigation
                        className='h-full'
                        ref={imageRef}
                       
                    >
                        {oneGallery?.map((item:string, index:number)=>(
                              <SwiperSlide className='w-full h-full' key={index+1}>
                              <div className='w-full h-full'>
                                  <img src={item} className='object-cover w-full h-full' />
                              </div>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* --------------------------------------------------------- */}
                <div className='lg:h-[729px] mt-4 lg:mt-0'>
                    <button className='swiper-gallery-prev cursor-pointer pt-1 pl-[50px] pb-[37px] hidden lg:block  bg-white'><i className="fa-solid fa-chevron-up text-[20px]"></i></button>
                    <Swiper
                        modules={[Navigation]}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={{
                            prevEl: '.swiper-gallery-prev ',
                            nextEl: '.swiper-gallery-next'
                        }}
                        direction={isMobile <= 1024 ? 'horizontal' : 'vertical'}
                        slidesPerView={4}
                        spaceBetween={9}
                        breakpoints={{
                            576: {
                                slidesPerView: 4,
                                spaceBetween: 9
                            },
                            0: {
                                slidesPerView: 4,
                                spaceBetween: 8
                            }
                        }}
                        className='lg:h-[604px]'

                    >
                        {oneGallery?.map((item:string,index:number)=>(
                             <SwiperSlide key={index+1}>
                             <div className='lg:w-[95px] lg:h-[142px]'>
                                 <img src={item} onClick={()=> onChangeImage(index)} className=' cursor-pointer w-full h-full object-cover' />
                             </div>
                         </SwiperSlide>
                        ))}
                    </Swiper>
                    <button className='swiper-gallery-next cursor-pointer pl-[50px] pt-[37px] hidden bg-white lg:block'><i className="fa-solid fa-chevron-down text-[20px]"></i></button>
                </div>
            </div>
        </>
    )
}

export default Slider_product_details