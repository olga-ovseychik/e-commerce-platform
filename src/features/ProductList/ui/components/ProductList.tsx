import ProductItem from "@/entities/product/ui/components/ProductItem.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from "@tanstack/react-router";
import type { Product } from "@/entities/product/model/types.ts";
import type { PostgrestError } from "@supabase/supabase-js";


type Props = {
  page: number;
  limit: number;
  isPending: boolean;
  items: {
    productItems: Product[] | null
    count: number | null
    error: PostgrestError | null
  } | undefined
}

const ProductList = ({limit, page, items, isPending}: Props) => {
  const router = useRouter()
  const total = Math.ceil((items?.count ?? 0) / limit);

  const handleNext = () => {
    router.navigate({ to: '/products', search: {page: page+1, limit} })
    window.scrollTo(0, 0)
  }

  const handlePrev = () => {
    router.navigate({ to: '/products', search: {page: page > 1 ? page-1 : page, limit} })
    window.scrollTo(0, 0)
  }

  const handleSetPage = (page: number) => {
    router.navigate({ to: '/products', search: {page: page, limit} })
    window.scrollTo(0, 0)
  }

  if (isPending) {
    return <div data-testid='loading-indicator'>Loading...</div>
  }

  if (!items?.productItems) {
    return <div>No products yet.</div>
  }

  const start = page === 1 ? page : page-1
  const end = page === total ? total : page+1
  const pages = Array.from({length: total}).slice(start-1, end)

  return (
    <>
      <div
        className="grid md:grid-cols-3 gap-4 sm:grid-cols-2 xs:grid-cols-1"
        data-testid="products-list"
      >
        {items?.productItems?.map((product) => (
          <ProductItem key={product.id} item={product}/>
        ))}
      </div>
      <div className='flex flex-row justify-center gap-2 mt-6'>
        <button
          className='border border-mist-400 rounded-md px-1 cursor-pointer text-mist-600 text-sm disabled:border-mist-300'
          onClick={handlePrev}
          disabled={page===1}
          data-testid="prev-button"
        >
          <FontAwesomeIcon icon={faArrowLeft} className={`${page===1 ? 'text-mist-300' : 'text-mist-600'}`} size='sm'/>
        </button>

        {pages.map((_, i) => {
          return (
            <button
              key={i}
              className={`border border-mist-400 rounded-md px-2 cursor-pointer text-mist-600 ${page===i+1 ? 'bg-mist-100 border-0' : ''}`}
              onClick={() => handleSetPage(i+1)}
              data-testid='page-button'
            >
              {start+1}
            </button>
            )
        })}
        <button
          className={`border border-mist-400 rounded-md px-1 cursor-pointer text-mist-600 text-sm disabled:border-mist-300`}
          onClick={handleNext}
          disabled={total===page}
          data-testid="next-button"
        >
          <FontAwesomeIcon icon={faArrowRight} className={`${total===page ? 'text-mist-300' : 'text-mist-600'}`} size='sm'/>
        </button>
      </div>
    </>

  )
}

export default ProductList