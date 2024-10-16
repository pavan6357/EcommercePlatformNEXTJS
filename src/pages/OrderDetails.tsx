import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Footer from '../components/Footer'

// This is a mock order for demonstration purposes
const mockOrder = {
  id: '12345',
  date: '2023-05-15',
  status: 'Shipped',
  total: 299.97,
  items: [
    { id: 1, name: 'Wireless Headphones', price: 149.99, quantity: 1 },
    { id: 2, name: 'Smartphone Case', price: 24.99, quantity: 2 },
  ],
  shippingAddress: '123 Main St, Anytown, USA 12345',
  paymentMethod: 'Credit Card',
  estimatedDelivery: '2023-05-20',
}

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>()
  
  // In a real application, you would fetch the order details based on the orderId
  const order = mockOrder

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Order Details</h1>
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Order #{order.id}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Placed on {order.date}
            </p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200 dark:sm:divide-gray-700">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{order.status}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">${order.total.toFixed(2)}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Shipping Address</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{order.shippingAddress}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Method</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{order.paymentMethod}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Estimated Delivery</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{order.estimatedDelivery}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Items</h2>
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {order.items.map((item) => (
                <li key={item.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <Link
            to="/orders"
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            &larr; Back to Orders
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default OrderDetails