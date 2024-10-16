import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { Trash2, Plus, Minus } from 'lucide-react'
import Footer from '../components/Footer'

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart()

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="mt-6">
            <p className="text-gray-500 dark:text-gray-400">Your cart is empty.</p>
            <Link to="/products" className="mt-4 inline-block text-indigo-600 hover:text-indigo-500">
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        ) : (
          <div className="mt-12">
            {cartItems.map((item) => (
              <div key={item.id} className="flex py-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-shrink-0 w-24 h-24 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-center object-cover" />
                </div>
                <div className="ml-4 flex-1 flex flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                      <h3>{item.name}</h3>
                      <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex-1 flex items-end justify-between text-sm">
                    <div className="flex items-center border rounded-md">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-2 text-gray-700 dark:text-gray-300">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-10">
              <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                <p>Subtotal</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <Link to="/checkout" className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Proceed to Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-sm text-center text-gray-500 dark:text-gray-400">
                <p>
                  or{' '}
                  <Link to="/products" className="text-indigo-600 font-medium hover:text-indigo-500">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Cart