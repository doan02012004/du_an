import 'antd/dist/reset.css'; // Import CSS của Ant Design
import Breadcrumb_products from './_components/Breadcrumb_products';
import Sidebar_prod from './_components/Sidebar_prod';
import Sub_main_prod from './_components/Sub_main_prod';
import Top_main_prod from './_components/Top_main_prod';
import useProductQuery from '../../../common/hooks/products/useProductQuery';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const ProductPage = () => {
    const [limit,] = useState(6)
    const [searchParams,] = useSearchParams()
    const page:string|number|null = searchParams.get('page')
    const sizes = searchParams.get('sizes')
    const colors = searchParams.get('colors')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const search = searchParams.get('search')
    const productQuery = useProductQuery({_limit:limit,_page:page,_sizes:sizes,_colors:colors,_minPrice:minPrice,_maxPrice:maxPrice,_search:search})
  return (
    <div>
      <Breadcrumb_products />
      {/* --------------------------------------------- --end breadcrumb-products-------------------------------------*/}

      <section className="section-list-products">
        <section className="box-products container lg:flex">
          <Sidebar_prod />
          {/*-------------------------------------end sidebar-prod ---------------------------------------------  */}

          <div className="main-prod lg:mb-[54px]">
            <Top_main_prod />
            {/* <!-------------------------------------------------------end top-main-prod-----------------------------  --> */}
            <Sub_main_prod data={productQuery?.data} />

          </div>
        </section>
      </section>
    </div>
  );
};

export default ProductPage;
