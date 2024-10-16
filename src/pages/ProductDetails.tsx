import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'
import Footer from '../components/Footer'

// Mock product data (replace with actual data fetching in a real application)
const products = [
  {
    id: 'gaming-console',
    name: 'Next-Gen Gaming Console',
    price: 499.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    description: 'Experience gaming like never before with our cutting-edge console. Immerse yourself in stunning 4K graphics, lightning-fast load times, and a vast library of games.',
    features: [
      '4K resolution at 60 FPS',
      'Ray tracing for realistic lighting',
      '1TB SSD for fast loading',
      'Backwards compatibility with previous generation games',
      'Advanced haptic feedback controller'
    ],
    specs: {
      CPU: '8-core 3.8 GHz Custom Zen 2',
      GPU: '10.28 TFLOPs, 36 CUs at 2.23 GHz Custom RDNA 2',
      Memory: '16GB GDDR6',
      Storage: '1TB Custom NVMe SSD',
      OpticalDrive: '4K UHD Blu-ray Drive'
    }
  },
  {
    id: 'smart-home',
    name: 'Smart Home Ecosystem',
    price: 299.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1558002038-bb4237b48b8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    description: 'Transform your house into a smart home with our integrated ecosystem. Control lights, temperature, security, and more with just your voice or smartphone.',
    features: [
      'Voice-controlled smart assistant',
      'Integrated smart lighting system',
      'Programmable smart thermostat',
      'HD security cameras with night vision',
      'Smart door locks with remote access'
    ],
    specs: {
      Assistant: 'AI-powered with natural language processing',
      Compatibility: 'Works with major smart home protocols (Zigbee, Z-Wave, Wi-Fi)',
      Security: 'End-to-end encryption for all devices',
      PowerBackup: 'Built-in battery backup for core functions',
      Updates: 'Regular over-the-air updates for improved functionality'
    }
  },
  {
    id: 'camera-kit',
    name: 'Professional Camera Kit',
    price: 1299.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    description: 'Capture lifes moments in stunning detail with our professional-grade camera kit. Perfect for both beginners and seasoned photographers.',
    features: [
      '24.2 MP full-frame sensor',
      '4K video recording at 60 FPS',
      'In-body image stabilization',
      'Weather-sealed body for durability',
      'Dual SD card slots for backup'
    ],
    specs: {
      Sensor: '24.2 MP Full-Frame CMOS',
      Processor: 'DIGIC X Image Processor',
      ISO: '100-102400 (expandable to 50-819200)',
      AF: '191-point AF system with 100% coverage',
      LCD: '3.2" vari-angle touchscreen, 2.1 million dots'
    }
  }
]

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const product = products.find(p => p.id === productId)

  if (!product) {
    return <div>Product not found</div>
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 })
    alert('Product added to cart!')
  }

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      alert('Product removed from wishlist!')
    } else {
      addToWishlist(product)
      alert('Product added to wishlist!')
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Image */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-center object-cover" />
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{product.name}</h1>
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
            </div>

            {/* Rating */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <Star
                      key={rating}
                      className={`${
                        product.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                      } h-5 w-5 flex-shrink-0`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-700 dark:text-gray-300">{product.description}</p>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Features</h3>
              <ul className="mt-4 pl-4 list-disc text-sm space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">{feature}</li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Specifications</h3>
              <dl className="mt-4 space-y-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 gap-4">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{key}</dt>
                    <dd className="text-sm text-gray-900 dark:text-white col-span-2">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-10 flex sm:flex-col1">
              <button
                onClick={handleAddToCart}
                className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to cart
              </button>

              <button
                onClick={handleWishlist}
                className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              >
                <Heart
                  className={`h-6 w-6 flex-shrink-0 ${
                    isInWishlist(product.id) ? 'text-red-500 fill-current' : ''
                  }`}
                  aria-hidden="true"
                />
                <span className="sr-only">Add to favorites</span>
              </button>
            </div>

            <div className="mt-6">
              <Link
                to="/products"
                className="text-base font-medium text-indigo-600 hover:text-indigo-500"
              >
                Back to all products
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductDetails