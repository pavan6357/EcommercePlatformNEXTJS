import React, { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductListing from './pages/ProductListing'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Wishlist from './pages/Wishlist'
import OrderDetails from './pages/OrderDetails'
import { ThemeProvider } from './contexts/ThemeContext'
import { CartProvider } from './contexts/CartContext'
import { WishlistProvider } from './contexts/WishlistContext'
import LoadingScreen from './components/LoadingScreen'
import ProductDetails from './pages/ProductDetails'

const pageVariants = {
  initial: {
    opacity: 0,
    x: '-100vw',
    scale: 0.8
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    x: '100vw',
    scale: 1.2
  }
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
}

function App() {
  const [loading, setLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [location])

  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          {loading && <LoadingScreen />}
          <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Home />
                  </motion.div>
                } />
                <Route path="/products" element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <ProductListing />
                  </motion.div>
                } />
                <Route path="/cart" element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Cart />
                  </motion.div>
                } />
                <Route path="/checkout" element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Checkout />
                  </motion.div>
                } />
                <Route path="/login" element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Login />
                  </motion.div>
                } />
                <Route path="/register" element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Register />
                  </motion.div>
                } />
                <Route path="/wishlist" element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Wishlist />
                  </motion.div>
                } />
                <Route path="/order/:orderId" element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <OrderDetails />
                  </motion.div>
                } />
                <Route path="/product/:productId" element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <ProductDetails />
                  </motion.div>
                } />
              </Routes>
            </AnimatePresence>
          </div>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App