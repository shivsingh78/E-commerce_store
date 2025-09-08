import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { authDataContext } from './AuthContext'
import { userDataContext } from './UserContext'
import {toast} from 'react-toastify'


export const shopDataContext = createContext()

function ShopContext({ children }) {
  const [products, setProducts] = useState([])   // ✅ default empty array
  const [search,setSearch] = useState('')
  const {userData} = useContext(userDataContext)
  const [showSearch,setShowSearch] =useState(false)
  const [loading,setLoading] = useState(false)
  const { serverUrl } = useContext(authDataContext)
  const [cartItem, setCartItem] = useState({})

  const currency = '₹'
  const delivery_fee = 40


  //fetch all products
  const getProducts = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list")
      console.log("Fetched products:", result.data)
      console.log(result.data);
      
      setProducts(result.data)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("failed to fetch products")
    }
  }

  //add item to cart

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

    if(userData) {
      try {
        let result = await axios.post(serverUrl + '/api/cart/add',{ itemId, size }, {withCredentials: true})

        console.log(result);
        
        
        
      } catch (error) {
        console.log(error);
        
        
      }
    }
  }

  const getUserCart = async () => {
      try {
        setLoading(true)
        const result = await axios.post(serverUrl + '/api/cart/get',{},{withCredentials: true })

        setCartItem(result.data)
        setLoading(false)
        
      } catch (error) {
        console.log(error)
        toast.error(error.message)
        
      }
    }

    const UpdateQuantity = async (itemId,size,quantity)  => {
      let cartData = structuredClone(cartItem);
      cartData[itemId][size] = quantity;
      setCartItem(cartData)

      if (userData) {
        try {
          await axios.post(serverUrl + "/api/cart/update", {itemId,size,quantity }, {withCredentials: true})
          
        } catch (error) {
          console.log(error);
          toast.error(error.message)
          
          
        }
      }
      
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

  const getCartAmount = async () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items) 
    
    for(const item in cartItem[items]) {
      try {
        if(cartItem[items][item] > 0){
          totalAmount += itemInfo.price * cartItem[items][item];

        }
        
      } catch (error) {
        console.log(error);
        toast.error("failed to fetch amount")
        
        
      }
    }
  }
  }





  // ✅ Run on mount
  useEffect(() => {
    getProducts()
  }, [serverUrl])

  useEffect(()=> {
    getUserCart()
  },[])

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
    UpdateQuantity,
  }

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  )
}

export default ShopContext
