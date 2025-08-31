import React, { createContext, useCallback, useContext, useState } from 'react'
import { authDataContext } from './AuthContext'
export const shopDataContext = createContext()
function ShopContext({children}) {
     let [products,setProducts] =useState()
     let {serverUrl} = useContext(authDataContext);
     let currency = '₹'
     let delivery_fee = 40;

     const getProducts = async () => {
          try {
               let result = await axios.get(serverUrl + "/api/product/list")
               console.log(result.data);
               setProducts(result.data)
               
          } catch (error) {
               console.log(error);
               
               
          }
          
     }
     useCallback(()=>{
          getProducts()
     },[])
     let value = {
          products, currency, delivery_fee, getProducts

     }
  return (
    <div>
     <shopDataContext.Provider value={value}>
          {children}
     </shopDataContext.Provider>
    </div>
  )
}

export default ShopContext