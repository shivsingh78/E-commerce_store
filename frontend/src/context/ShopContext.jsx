import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { authDataContext } from './AuthContext'

export const shopDataContext = createContext()

function ShopContext({ children }) {
  const [products, setProducts] = useState([])   // ✅ default empty array
  const [search,setSearch] = useState('')
  const [showSearch,setShowSearch] =useState(false)
  const { serverUrl } = useContext(authDataContext)
  const [cartItem, setCartItem] = useState({})

  const currency = '₹'
  const delivery_fee = 40

  const getProducts = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list")
      console.log("Fetched products:", result.data)
      setProducts(result.data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const addtoCart = async (itemId , size) => {
    if(!size) {
      console.log("Select Product Size");
      return ;
      
    }
    let cartData = structuredClone(cartItem) // clone the product 

    if(cartData[itemId]) {
      if(cartData[itemId][size]) {
        cartData[itemId][size] +=1;
      } else{
        cartData[itemId][size] =1;
      }
    }
    else{
      cartData[itemId] ={}
      cartData[itemId][size] = 1;

    }
    setCartItem(cartData)
    console.log(cartData)
    
  }
  const getCartCount = () => {
    let totalCount =0;
    for(const items in cartItem){
      for(const item in cartItem[items]){
        try {
          if(cartItem[items][item] > 0) {
            totalCount += cartItem[items][item]
          }
        } catch (error) {
          console.log(error);
          
          
        }
      }
    }
    return totalCount
  }



  // ✅ Run on mount
  useEffect(() => {
    getProducts()
  }, [serverUrl])

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
    setCartItem
  }

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  )
}

export default ShopContext
