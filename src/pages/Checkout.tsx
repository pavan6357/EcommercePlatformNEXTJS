import React, { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { CreditCard } from 'lucide-react'
import Footer from '../components/Footer'

const Checkout: React.FC = () => {
  const { cartItems } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'paypal'>('credit-card')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.address) newErrors.address = 'Address is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.country) newErrors.country = 'Country is required'
    if (!formData.zipCode) newErrors.zipCode = 'Zip Code is required'
    
    if (paymentMethod === 'credit-card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card Number is required'
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry Date is required'
      if (!formData.cvc) newErrors.cvc = 'CVC is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Process the payment
      console.log('Processing payment:', formData)
      alert('Payment processed successfully!')
    }
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <div className="flex justify-between">
                <p className="text-lg font-medium text-gray-900 dark:text-white">Total</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Payment Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.city && <p className="mt-2 text-sm text-red-600">{errors.city}</p>}
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.country && <p className="mt-2 text-sm text-red-600">{errors.country}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.zipCode && <p className="mt-2 text-sm text-red-600">{errors.zipCode}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Method</label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit-card')}
                    className={`flex items-center justify-center px-4 py-2 border rounded-md ${
                      paymentMethod === 'credit-card'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`flex items-center justify-center px-4 py-2 border rounded-md ${
                      paymentMethod === 'paypal'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.616 4.643-6.04 4.643h-2.189a1.279 1.279 0 0 0-1.262 1.080l-1.12 7.106c-.068.437.244.837.688.837h4.595c.551 0 1.02-.398 1.106-.94l.046-.24.883-5.59.056-.304a1.107 1.107 0 0 1 1.095-.942h.688c4.47 0 7.971-1.804 8.99-7.073.398-2.052.16-3.761-.898-5.01z"/>
                    </svg>
                    PayPal
                  </button>
                </div>
              </div>
              {paymentMethod === 'credit-card' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && <p className="mt-2 text-sm text-red-600">{errors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="MM / YY"
                      />
                      {errors.expiryDate && <p className="mt-2 text-sm text-red-600">{errors.expiryDate}</p>}
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 dark:text-gray-300">CVC</label>
                      <input
                        type="text"
                        id="cvc"
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="123"
                      />
                      {errors.cvc && <p className="mt-2 text-sm text-red-600">{errors.cvc}</p>}
                    </div>
                  </div>
                </div>
              )}
              {paymentMethod === 'paypal' && (
                <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    You will be redirected to PayPal to complete your payment.
                  </p>
                </div>
              )}
              <button
                type="submit"
                className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Pay ${total.toFixed(2)}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Checkout