import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../../../assets/logo.png'
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function MainNavbar() {
  const [showSearchText, setShowSearchText] = useState<boolean>(false);

  return (
    <nav data-testid="main-navbar" className='flex flex-row gap-5 border-b border-gray-200 p-5 items-center'>
      <Link to='/' data-testid="logo" className='w-1/6'>
        <img src={logo} alt='Logo' className='h-10'/>
      </Link>
      <div className='relative w-2/3'>
        <button className='absolute right-1 top-1/8 bg-emerald-500 p-2 rounded-md flex gap-1 flex-row items-center cursor-pointer'>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='text-gray-50' size='lg'/>
          {showSearchText && <span className='text-gray-50 font-medium pr-1 text-sm'>Search</span>}
        </button>
        <input
          data-testid="search"
          placeholder='Search product'
          onFocus={() => setShowSearchText(true)}
          onBlur={() => setShowSearchText(false)}
          className='border rounded-md w-full p-2 border-gray-200 h-12 focus-within:outline-2 focus-within:outline-emerald-500 placeholder-transparent focus:placeholder-gray-400'/>
      </div>
      <ul data-testid="nav-actions" className='flex flex-row gap-5 w-1/3 justify-end items-center'>
        <li className='p-2 rounded-md hover:bg-gray-50 cursor-pointer'>
          <button className='text-gray-600 text-sm font-semibold cursor-pointer'>
            <FontAwesomeIcon icon={faUser} className='text-gray-400 mr-1 cursor-pointer' size='lg'/>
            Log In
          </button>
        </li>
        <li className='p-2 rounded-md hover:bg-gray-50 cursor-pointer'>
          <button className='text-gray-600 text-sm font-semibold cursor-pointer'>Sign Up</button>
        </li>
        <li className='flex flex-row items-center rounded-md p-2 bg-gray-50 hover:bg-gray-100 cursor-pointer'>
          <FontAwesomeIcon icon={faCartShopping} className='text-gray-400 mr-1 cursor-pointer' size='lg'/>
          <div className='flex flex-col items-start'>
            <span className='text-sm text-gray-500 leading-4'>Cart</span>
            <span className='leading-4 font-bold text-gray-600'>$0,00</span>
          </div>
        </li>
      </ul>
    </nav>
  )
}