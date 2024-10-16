import React from 'react'
import { useWishlist } from '../contexts/WishlistContext'
import { useCart } from '../contexts/CartContext'
import { Trash2, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const Wishlist: React.FC = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (item: any) => {
    addToCart({ ...item, quantity: 1 })
    removeFromWishlist(item.id)
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Your Wishlist</h1>
        {wishlistItems.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Your wishlist is empty.</p>
            <Link to="/products" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition duration-300">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-t-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                  <img src={item.image} alt={item.name} className="w-full h-full object-center object-cover group-hover:opacity-75" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="mt-1 text-xl font-medium text-gray-900 dark:text-white">${item.price.toFixed(2)}</p>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 mr-2 bg-indigo-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="flex-1 ml-2 bg-red-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Trash2 className="h-5 w-5 mr-2" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Wishlist