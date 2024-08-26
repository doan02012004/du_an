
import Pagination from './Pagination'
import Product from '../../_components/Product'
import { Iproduct } from '../../../../common/interfaces/product'

type Props = {
  data:{products:Iproduct[], total:number,totalPage:number,currentPage:number}
}

const Sub_main_prod = ({data}: Props) => {
  return (
    <>
        <div className="sub-main-prod mt-3 lg:mt-[26px]">
              <div className="list-products">
                <div className="item-cat-product grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-9">
                  {data?.products?.map((product:Iproduct)=>(
                     <Product product={product} key={product._id} />
                  ))}
                  {/* -----------------end products ---------------------------------------------*/}
                </div>
                {/* ------------------------------------------------------------------------------- */}
                <Pagination data={data} />
              </div>
            </div>
    </>
  )
}

export default Sub_main_prod