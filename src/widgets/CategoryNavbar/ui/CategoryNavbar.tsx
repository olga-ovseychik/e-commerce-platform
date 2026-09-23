import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faDollarSign, faPercent, faFire, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@tanstack/react-router";

export function CategoryNavbar() {
  return (
    <nav data-testid='category-navbar' className='border-b border-gray-200 mb-10 flex flex-row p-5'>
      <div className='hover:bg-gray-50 p-2 rounded-md flex items-center gap-0.5'>
        <FontAwesomeIcon icon={faBars} className='text-emerald-500 cursor-pointer' size='lg'/>
        <select data-testid='category-select' defaultValue='All categories'
          className='text-gray-600 text-sm font-semibold cursor-pointer focus:outline-none'
        >
          <option value="">All categories</option>
          <option value="fruits">Fruits</option>
        </select>
      </div>

      <ul data-testid="nav-links" className='flex flex-row gap-5'>
        <li className='p-2 rounded-md hover:bg-gray-50 cursor-pointer'>
          <FontAwesomeIcon icon={faDollarSign} className='text-emerald-500 mr-0.5 cursor-pointer' size='lg'/>
          <Link to='.' className='text-gray-600 text-sm font-semibold cursor-pointer'>Low prices</Link></li>
        <li className='p-2 rounded-md hover:bg-gray-50 cursor-pointer'>
          <FontAwesomeIcon icon={faPercent} className='text-emerald-500 mr-0.5 cursor-pointer' size='lg'/>
          <Link to='.' className='text-gray-600 text-sm font-semibold cursor-pointer'>Deals</Link>
        </li>
        <li className='p-2 rounded-md hover:bg-gray-50 cursor-pointer'>
          <FontAwesomeIcon icon={faBell} className='text-emerald-500 mr-0.5 cursor-pointer' size='lg'/>
          <Link to='.' className='text-gray-600 text-sm font-semibold cursor-pointer'>New Arrivals</Link>
        </li>
        <li className='p-2 rounded-md hover:bg-gray-50 cursor-pointer'>
          <FontAwesomeIcon icon={faFire} className='text-emerald-500 mr-0.5 cursor-pointer' size='lg'/>
          <Link to='.' className='text-gray-600 text-sm font-semibold cursor-pointer'>Bestsellers</Link>
        </li>
      </ul>
    </nav>
  )
}