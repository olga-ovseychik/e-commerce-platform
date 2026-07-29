import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClipboardList, faCircleMinus, faHeart as faFilledHeart} from '@fortawesome/free-solid-svg-icons'
import {faHeart, faCircleCheck} from '@fortawesome/free-regular-svg-icons'
import { useGetProduct } from "@/features/ProductDetails/hooks/useGetProduct.ts";
import { calcPrice } from "@/shared/lib/calcPrice.ts";
import { LoadingIndicator } from "@/shared/ui/LoadingIndicator/LoadingIndicator.tsx";
import { useFavorites } from "@/features/favorites/hooks/useFavorites.ts";


type Props = {
  id: string
}

const ProductDetails = ({ id }: Props) => {
  const { data, isPending, isError } = useGetProduct(Number(id))
  const {addToFavorites, removeFromFavorites, isFavorite} = useFavorites()
  const price = data &&
    calcPrice(data.productItem.price_per_kg ?? data.productItem.price_per_unit,
    data.productItem.product_items[0].weight, data.productItem.pricing_type
  );

  const handleClickFavorites = () => {
    if (isFavorite(Number(id))) {
      removeFromFavorites(Number(id))
    } else {
      addToFavorites(Number(id))
    }
  }

  if (isError) {
    return (
      <div className='flex justify-center align-middle' data-testid='error-message'>
        <p>Oops! Something went wrong</p>
      </div>
    )
  }

  if (isPending) {
    return (
      <div className='flex justify-center align-middle' data-testid='loading-indicator'>
        <LoadingIndicator />
      </div>
    )
  }

  return (
    <div className="flex">
      <div className='flex-1'>
        <img src={data?.productItem.image_url} alt={`${data?.productItem.name}`} data-testid='product-image'/>
      </div>
      <div className='flex-1'>
        <div className='font-bold text-2xl flex self-start mb-2' data-testid='product-name'>{data?.productItem?.name}</div>
        <div className='flex flex-row gap-2 mb-2'>
          <div className='flex self-end text-gray-500 text-sm' data-testid='product-weight'>
            {data?.productItem?.pricing_type === 'kg' ? `${data?.productItem?.product_items[0].weight}g` : '1 unit'}
          </div>
          <div className='text-gray-400'>&#x2022;</div>
          <div className='flex self-end font-bold text-gray-500' data-testid='product-brand'>{data?.productItem?.brand}</div>
        </div>

        <hr className='text-gray-200 mb-6'/>

        <div className='flex flex-row justify-between mb-6'>
          <div className='font-bold text-2xl text-gray-700'>${price}</div>
          <div className='text-md text-gray-500' data-testid='product-price'>
            {data?.productItem?.pricing_type === 'kg'
              ? `$${data?.productItem?.price_per_kg} / ${data?.productItem?.pricing_type}`
              : `${data?.productItem?.pricing_type}`}
          </div>
        </div>

        <hr className='text-gray-200 mb-6'/>

        <div className='flex flex-row justify-between mb-6 gap-2'>
          <button
            className='border-mist-300 border rounded-md p-1 w-full text-mist-600 font-semibold hover:bg-mist-100 cursor-pointer'
            data-testid='product-add-to-cart-button'
          >
            Add to cart
          </button>
          <div className='flex gap-2'>
            <button data-testid='product-add-to-list-button'><FontAwesomeIcon icon={faClipboardList} className='text-mist-500 cursor-pointer border border-mist-300 rounded-full p-2 hover:bg-mist-100' size='lg'/></button>
            <button
              data-testid='product-add-to-fav-button'
              onClick={handleClickFavorites}
            >
              <FontAwesomeIcon icon={isFavorite(Number(id)) ? faFilledHeart : faHeart} className={`${isFavorite(Number(id)) ? 'text-red-500' :'text-mist-500'} cursor-pointer border ${isFavorite(Number(id)) ? 'border-red-500' : 'border-mist-300'} rounded-full p-2 hover:bg-mist-100`} size='lg'/>
            </button>
          </div>
        </div>

        <hr className='text-gray-200 mb-6'/>

        <div className='mb-6'>
          <div className='flex self-start text-gray-500 text-lg font-bold'>Product description</div>
          <div className='flex self-start text-gray-500 text-md' data-testid='product-description'>{data?.productItem?.description}</div>
        </div>

        <hr className='text-gray-200 mb-6'/>

        <div className='flex self-start'>
          {data.productItem.product_items[0].in_stock
            ? <div data-testid='product-availability' className='text-mist-500'><FontAwesomeIcon icon={faCircleCheck} className='text-green-500' size='lg'/> Product is in stock</div>
            : <div data-testid='product-availability' className='text-mist-500'><FontAwesomeIcon icon={faCircleMinus} className='text-red-500' size='lg'/> Product out of stock</div>
          }
        </div>
      </div>
    </div>
  )
}

export default ProductDetails;