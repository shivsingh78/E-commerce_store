import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
  const { products = [] } = useContext(shopDataContext)   // ✅ default to []
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 8))  // ✅ only slice when products is available
    }
  }, [products])

  return (
    <div>
      <div className='h-[8%] w-[100%] text-center md:mt-[50px]'>
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100'>
          Step Into Style - New Collection Dropping This Season!
        </p>
      </div>

      <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
        {latestProducts.length > 0 ? (
          latestProducts.map((item, index) => (
            <Card
              key={item._id || index}   // ✅ better key: use _id if available
              name={item.name}
              image={item.image1}
              id={item._id}
              price={item.price}
            />
          ))
        ) : (
          <p className="text-gray-400">Loading products...</p>  // ✅ fallback while products load
        )}
      </div>
    </div>
  )
}

export default LatestCollection
