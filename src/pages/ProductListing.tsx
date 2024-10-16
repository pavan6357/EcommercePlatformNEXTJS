import React, { useState, useEffect } from 'react'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'
import { Star, Filter, Heart, ShoppingCart } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
  category: string
  description: string
}

const products: Product[] = [
  { id: 1, name: "Smartphone", price: 599.99, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", rating: 4.5, category: "Electronics", description: "Latest model with advanced features and long battery life." },
  { id: 2, name: "Laptop", price: 999.99, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", rating: 4.7, category: "Electronics", description: "Powerful laptop for work and entertainment." },
  { id: 3, name: "Headphones", price: 149.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", rating: 4.3, category: "Electronics", description: "High-quality sound with noise cancellation." },
  { id: 4, name: "Smart Watch", price: 249.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", rating: 4.1, category: "Wearables", description: "Track your fitness and stay connected on the go." },
  { id: 5, name: "Wireless Earbuds", price: 129.99, image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", rating: 4.6, category: "Audio", description: "True wireless freedom with exceptional sound quality." },
  { id: 6, name: "Tablet", price: 349.99, image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", rating: 4.4, category: "Electronics", description: "Versatile tablet for work and entertainment." },
  { id: 7, name: "4K Smart TV", price: 799.99, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", rating: 4.8, category: "Electronics", description: "Immersive viewing experience with smart features." },
  { id: 8, name: "Wireless Speaker", price: 89.99, image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", rating: 4.2, category: "Audio", description: "Portable speaker with rich, room-filling sound." },
]

const ProductListing: React.FC = () => {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalType, setModalType] = useState<'cart' | 'wishlist'>('cart')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'price' | 'rating' | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const searchTerm = searchParams.get('search')
    if (searchTerm) {
      setFilteredProducts(products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    } else {
      setFilteredProducts(products)
    }
  }, [location.search])

  useEffect(() => {
    const hash = location.hash.slice(1)
    if (hash) {
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location.hash])

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 })
    setModalMessage('Your Product was Saved to Cart')
    setModalType('cart')
    setShowModal(true)
    setTimeout(() => setShowModal(false), 3000)
  }

  const handleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      setModalMessage('Product Removed from Your Wishlist')
    } else {
      addToWishlist(product)
      setModalMessage('Your Product was Saved to Your Wishlist')
    }
    setModalType('wishlist')
    setShowModal(true)
    setTimeout(() => setShowModal(false), 3000)
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  const handleSort = (type: 'price' | 'rating') => {
    setSortBy(type)
  }

  const handlePriceRangeChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRange = [...priceRange]
    newRange[index] = Number(event.target.value)
    setPriceRange(newRange as [number, number])
  }

  useEffect(() => {
    let result = products
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category))
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (sortBy) {
      result = [...result].sort((a, b) => sortBy === 'price' ? a.price - b.price : b.rating - a.rating)
    }
    setFilteredProducts(result)
  }, [selectedCategories, sortBy, priceRange])

  const categories = Array.from(new Set(products.map(p => p.category)))

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Products</h2>
        
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filters</h3>
              
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Categories</h4>
                {categories.map(category => (
                  <div key={category} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryFilter(category)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={category} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {category}
                    </label>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Price Range</h4>
                <div className="flex flex-col space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(e, 0)}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(e, 1)}
                    className="w-full"
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">${priceRange[0]}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/4">
            <div className="flex justify-end mb-4">
              <div className="flex items-center space-x-4">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  onChange={(e) => handleSort(e.target.value as 'price' | 'rating')}
                  className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Sort by</option>
                  <option value="price">Price: Low to High</option>
                  <option value="rating">Rating: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  id={`${product.id}`} 
                  className="group bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 animate-fadeIn"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-t-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img src={product.image} alt={product.name} className="w-full h-full object-center object-cover group-hover:opacity-75" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                    <p className="mt-1 text-xl font-medium text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{product.description}</p>
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                          fill="currentColor"
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-2/3 bg-indigo-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => navigate('/checkout')}
                        className="w-1/3 ml-2 bg-green-500 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out"
                      >
                        Buy Now
                      </button>
                    </div>
                    <button
                      onClick={() => handleWishlist(product)}
                      className="mt-2 w-full bg-gray-100 dark:bg-gray-700 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out"
                    >
                      <Heart className={`h-5 w-5 mr-2 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                      {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed bottom-0 inset-x-0 px-4 pb-4">
          <div className={`${modalType === 'cart' ? 'bg-green-500' : 'bg-blue-500'} text-white rounded-lg px-4 py-3 shadow-md`}>
            <p className="text-center font-medium">{modalMessage}</p>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default ProductListing