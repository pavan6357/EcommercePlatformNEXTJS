import React, { createContext, useContext, useState, ReactNode } from 'react'

interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
}

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prevItems) => {
      if (!prevItems.some((i) => i.id === item.id)) {
        return [...prevItems, item]
      }
      return prevItems
    })
  }

  const removeFromWishlist = (id: number) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const isInWishlist = (id: number) => {
    return wishlistItems.some((item) => item.id === id)
  }

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}