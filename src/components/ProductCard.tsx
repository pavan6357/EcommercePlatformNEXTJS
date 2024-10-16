import React from 'react'
import { Link } from 'react-router-dom'

interface ProductCardProps {
  product: {
    id: number
    title: string
    description: string
    image: string
    learnMoreLink: string
  }
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="md:w-1/2 p-6 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{product.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
        <div className="flex space-x-4">
          <Link
            to="/products"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition duration-300"
          >
            Shop Now
          </Link>
          <Link
            to={product.learnMoreLink}
            className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white px-6 py-2 rounded-md font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
      <div className="md:w-1/2">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
      </div>
    </div>
  )
}

export default ProductCard