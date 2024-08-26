import Breadcrumb_products from "./_components/Breadcrumb_products";
import Product_information from "./_components/Product_information";
import Slider_product_details from "./_components/Slider_product_details";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Similar_product from "./_components/Similar_product";
import Viewed_products from "./_components/Viewed_products";
import Banner from "./_components/Banner";
import { useParams } from "react-router-dom";
import useProductQuery from "../../../common/hooks/products/useProductQuery";
import { useEffect, useState } from "react";
import { Iproduct } from "../../../common/interfaces/product";
const ProductDetailsPage = () => {
  const [product,setProduct] = useState({} as Iproduct)
  const [color,setColor] = useState('' as string)
  const {id} = useParams()
  const productQuery = useProductQuery({id:id})
  useEffect(()=>{
    if(productQuery.data){
      setProduct(productQuery.data)
      setColor(productQuery.data.colors[0].name)
    }
  },[productQuery.data,id])
  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  },[id])
  return (
    <div>
        <div>
            <Breadcrumb_products />
            {/* --------------------------------------------- --end breadcrumb-products-------------------------------------*/}
            <section className='lg:mb-8'>
                <section className='container lg:grid lg:grid-cols-2'>
                    <Slider_product_details product={product} color={color} />
                    {/* ---------------------------------end product_details------------------------------------------------------- */}
                    <Product_information product={product} color={color} setColor={setColor} />

                </section>
                {/* ------------------------------------------------------ */}
            </section>
            {/*  */}
            {/* -----------------------------------------------end productdetails------------------------- */}
            <Similar_product />
            {/* ---------------- */}
            <Viewed_products />
            <Banner />

        </div>

    </div>
  )
}

export default ProductDetailsPage