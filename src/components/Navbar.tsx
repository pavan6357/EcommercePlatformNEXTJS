import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Sun, Moon, User, Home, Package, ShoppingBag, List, Search, Heart } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useTheme } from '../contexts/ThemeContext'
import { useWishlist } from '../contexts/WishlistContext'

const Navbar: React.FC = () => {
  const { cartItems } = useCart()
  const { darkMode, toggleDarkMode } = useTheme()
  const { wishlistItems } = useWishlist()
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <ShoppingBag className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">
                  <Home className="inline-block mr-1 h-5 w-5" />
                  Home
                </Link>
                <Link to="/products" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">
                  <Package className="inline-block mr-1 h-5 w-5" />
                  Products
                </Link>
                <Link to="/orders" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">
                  <List className="inline-block mr-1 h-5 w-5" />
                  Your Orders
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <form onSubmit={handleSearch} className="relative mr-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition duration-300 ease-in-out"
            >
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <Link to="/wishlist" className="ml-4 relative">
              <Heart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="ml-4 relative">
              <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link to="/login" className="ml-4">
              <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar