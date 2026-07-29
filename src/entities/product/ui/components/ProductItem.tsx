import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClipboardList} from '@fortawesome/free-solid-svg-icons'
import type {ProductItemProps} from '../../model/types.ts'
import { calcDiscount } from "@/shared/lib/calcDiscount.ts";
import { calcPrice } from "@/shared/lib/calcPrice.ts";
import { useRef, useState } from "react";
import { useClickAway } from "@/shared/hooks/useClickAway.ts";
import { useRouter } from "@tanstack/react-router";


const ProductItem = ({item}: ProductItemProps) => {
  const [quantity, setQuantity] = useState<number>(0)
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const menuRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  useClickAway(menuRef, handleCloseMenu, [buttonRef])
  const router = useRouter()

  const price = calcPrice(item.price_per_kg ?? item.price_per_unit, item.product_items[0].weight, item.pricing_type)

  const handleChangeQuantity = (value: number) => {
    setQuantity(quantity + value)
  }

  const handleNavigateToDetailsPage = () => {
    router.navigate({ to: '/products/$id', params: { id: String(item.id) } })
  }

  function handleOpenMenu(){
    setShowMenu((prev) => !prev)
  }

  function handleCloseMenu(){
    setShowMenu(false)
  }

  return (
    <div
      className='bg-mist-50 rounded-lg shadow-xs flex flex-col items-center p-5 relative justify-between'
      onClick={handleNavigateToDetailsPage}
    >
      <button
        className='absolute right-5 cursor-pointer'
        onClick={handleOpenMenu}
        ref={buttonRef}
        data-testid='products-list-button'
      >
        <FontAwesomeIcon icon={faClipboardList} className='text-mist-400' size='lg'/>
      </button>
      <ul
        data-testid='products-list-menu'
        ref={menuRef}
        className={`${showMenu ? 'visible' : 'hidden'} absolute right-5 top-12 text-left p-2 rounded-md  flex flex-col gap-1 bg-white/50`}
      >
        <li className='text-sm border rounded-md border-mist-300 p-1 bg-white cursor-pointer'>
          <select>
            <option>Products</option>
            <option>October list</option>
          </select>
        </li>
        <li className='text-sm border rounded-md border-mist-300 p-1 bg-white cursor-pointer'>Create a list</li>
      </ul>
      {!!(item.discount) && (
        <div className='absolute left-5 rounded-md border border-red-500 text-red-500 px-2 py-1 uppercase text-xs font-bold tracking-wider'>
          special offer
        </div>
      )}
      <div className='flex justify-center items-center' data-testid='product-item'>
        <img
          src={item.image_url ?? 'https://placehold.co/300x300'}
          className='object-scale-down h-56 w-56'
          alt='product'
          data-testid='product-image'
        />
      </div>
      <div className='self-start flex flex-col items-start p-5 w-full'>
        <div className='text-mist-500 text-md font-semibold' data-testid='product-brand'>{item.brand}</div>
        <div className='text-mist-900 mb-1' data-testid='product-name'>{item.name}</div>
        <div className='flex w-full justify-between'>
          <div className='text-mist-500 text-sm' data-testid='product-weight'>
            {item.pricing_type === 'kg' ? `${item.product_items[0].weight}g` : '1'}
          </div>
          <div className='text-mist-500 text-sm' data-testid='product-weight-type'>
            {item.pricing_type === 'kg' ? `$${item.price_per_kg} / ${item.pricing_type}` : `${item.pricing_type}`}
          </div>
        </div>
        <div className='flex flex-row gap-2 my-4 items-center'>
          {!!(item.discount) && (
            <div
              className='font-bold text-xl text-red-500'
              data-testid='product-discount'>
              {item.discount ? `$${calcDiscount(price, item.discount)}` : null}
            </div>
          )}
          <div
            data-testid='product-price'
            className={`${item.discount ? 'line-through text-sm text-mist-500' : 'font-bold text-xl'}`}>
            ${price}
          </div>
        </div>
        <div data-testid='product-availability'>{item.product_items[0].in_stock ?? 'Out of stock'}</div>
        <div className='flex flex-row gap-2 items-center'>
          <div className='flex items-start w-1/2'>
            <button className='border w-1/2 rounded-md border-mist-300 p-1 cursor-pointer hover:bg-mist-100'
              disabled={quantity === 0}
              onClick={() => handleChangeQuantity(-1)}
              data-testid='subtract-quantity-button'
            >
              -
            </button>
            <input
              onChange={(e) => setQuantity(Number(e.target.value))}
              value={quantity}
              className='w-1/2 text-center text-mist-500 p-1' placeholder='0'
            />
            <button
              className='border w-1/2 rounded-md border-mist-300 p-1 cursor-pointer hover:bg-mist-100'
              onClick={() => handleChangeQuantity(1)}
              data-testid='add-quantity-button'
            >
              +
            </button>
          </div>
          <button
            className='border-mist-300 border rounded-md p-1 w-full text-mist-600 font-semibold hover:bg-mist-100 cursor-pointer'
            data-testid='add-to-cart-button'
          >
            Add to cart
          </button>
        </div>

      </div>
    </div>
  )
}

export default ProductItem