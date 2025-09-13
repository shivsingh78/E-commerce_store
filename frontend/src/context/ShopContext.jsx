import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { authDataContext } from './AuthContext'
import { userDataContext } from './UserContext'
import { toast } from 'react-toastify'

export const shopDataContext = createContext()

function ShopContext({ children }) {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const { userData } = useContext(userDataContext)
  const [showSearch, setShowSearch] = useState(false)
  const [loading, setLoading] = useState(false)
  const { serverUrl } = useContext(authDataContext)
  const [cartItem, setCartItem] = useState({})
 
  const currency = '₹'
  const delivery_fee = 40

  // ✅ Fetch all products
  const getProducts = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list")
      setProducts(result.data)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("failed to fetch products")
    }
  }

  // ✅ Add item to cart
  const addtoCart = async (itemId, size) => {
  if (!size) {
    toast.error("Select product size");
    return;
  }

  setLoading(true);

  try {
    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);

    // Only after updating local cart, call DB if logged in
    if (userData) {
      await axios.post(
        serverUrl + "/api/cart/add",
        { itemId, size },
        { withCredentials: true }
      );
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to add to cart");
  } finally {
    setLoading(false); // ensures loading is set to false after async operation
  }
};

  // ✅ Get user cart from DB
  const getUserCart = async () => {
    if (!userData) return

    try {
      setLoading(true)
      const result = await axios.post(serverUrl + '/api/cart/get', {}, { withCredentials: true })

      // ✅ Merge DB cart with localStorage
      let mergedCart = { ...JSON.parse(localStorage.getItem("cartData") || "{}"), ...result.data }
      setCartItem(mergedCart)
      localStorage.setItem("cartData", JSON.stringify(mergedCart))

      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // ✅ Update quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem)
    cartData[itemId][size] = quantity
    setCartItem(cartData)

    if (userData) {
      try {
        await axios.post(serverUrl + "/api/cart/update", { itemId, size, quantity }, { withCredentials: true })
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  }

  const getCartCount = () => {
    let totalCount = 0
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          totalCount += cartItem[items][item]
        }
      }
    }
    return totalCount
  }

  const getCartAmount = () => {
    let totalAmount = 0
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items)
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          totalAmount += itemInfo?.price * cartItem[items][item]
        }
      }
    }
    return totalAmount
  }

  // ✅ Load products
  useEffect(() => {
    getProducts()
  }, [serverUrl])

  // ✅ Load cart from localStorage on first mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cartData")
    if (savedCart) {
      setCartItem(JSON.parse(savedCart))
    }
  }, [])

  // ✅ Sync with DB cart after login
  useEffect(() => {
    if (userData) {
      getUserCart()
    }
  }, [userData])

  // ✅ Always save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartItem))
  }, [cartItem])

  const value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addtoCart,
    getCartCount,
    setCartItem,
    getUserCart,
    loading,
    updateQuantity,
    getCartAmount
  }

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  )
}

export default ShopContext
