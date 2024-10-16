import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react'

const Footer: React.FC = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
    alert('Thank you for signing up for our newsletter!')
  }

  return (
    <footer className="bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Shop</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/products" className="text-base text-gray-500 hover:text-gray-900">All Products</Link></li>
                  <li><Link to="/products" className="text-base text-gray-500 hover:text-gray-900">Featured Items</Link></li>
                  <li><Link to="/products" className="text-base text-gray-500 hover:text-gray-900">New Arrivals</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/faq" className="text-base text-gray-500 hover:text-gray-900">FAQ</Link></li>
                  <li><Link to="/shipping" className="text-base text-gray-500 hover:text-gray-900">Shipping</Link></li>
                  <li><Link to="/returns" className="text-base text-gray-500 hover:text-gray-900">Returns</Link></li>
                  <li><Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">Contact Us</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/about" className="text-base text-gray-500 hover:text-gray-900">About Us</Link></li>
                  <li><Link to="/careers" className="text-base text-gray-500 hover:text-gray-900">Careers</Link></li>
                  <li><Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-base text-gray-500 hover:text-gray-900">Terms of Service</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900 flex items-center">
                      <Facebook className="h-6 w-6 mr-2" />
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900 flex items-center">
                      <Twitter className="h-6 w-6 mr-2" />
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900 flex items-center">
                      <Instagram className="h-6 w-6 mr-2" />
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 xl:mt-0">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Subscribe to our newsletter
            </h3>
            <p className="mt-4 text-base text-gray-500">
              Get the latest updates, deals, and exclusive offers directly in your inbox.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md" onSubmit={handleSubmit}>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2023 Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer