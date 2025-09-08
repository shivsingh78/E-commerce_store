import React, { useContext, useEffect, useState } from "react";
import Title from "../component/Title";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import {toast} from 'react-toastify'

function Cart() {
  const { products, currency, cartItem, updateQuantity } =
    useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        if (cartItem[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: cartItem[productId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  // Remove product completely
  const removeProduct = (productId, size) => {
    updateQuantity(productId, size, 0); // Set quantity to 0
  };

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 bg-gradient-to-l from-[#141414] to-[#0c2025]">
      {/* Page Title */}
      <div className="text-center mt-20 mb-8">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items */}
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {cartData.length === 0 ? (
          <p className="text-center text-gray-400">Your cart is empty.</p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-between bg-[#1a2a2f] rounded-2xl p-4 shadow-md gap-4"
              >
                {/* Left: Image */}
                <img
                  src={productData?.image1}
                  alt={productData?.name}
                  className="w-28 h-28 object-cover rounded-lg flex-shrink-0"
                />

                {/* Middle: Info */}
                <div className="flex-1 text-white text-center sm:text-left">
                  <h3 className="text-lg font-semibold">{productData?.name}</h3>
                  <p className="text-sm text-gray-400">Size: {item.size}</p>
                  <p className="text-sm text-gray-400">
                    Price: {currency}
                    {productData?.price}
                  </p>
                </div>

                {/* Right: Quantity & Total */}
                <div className="flex flex-col items-center sm:items-end gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.size, item.quantity - 1)
                      }
                      className="px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                      -
                    </button>
                    <span className="text-white font-medium">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.size, item.quantity + 1)
                      }
                      className="px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-green-400 font-semibold">
                    {currency}
                    {productData?.price * item.quantity}
                  </p>
                  {/* Dustbin / Remove Button */}
                  <button
                    onClick={() => removeProduct(item._id, item.size)}
                    className="mt-2 text-red-500 hover:text-red-700 cursor-pointer"
                    title="Remove from cart"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Checkout Section */}
      {cartData.length > 0 && (
  <div className="fixed bottom-0 left-0 w-full sm:relative sm:max-w-4xl sm:mx-auto bg-[#1a2a2f] rounded-t-2xl sm:rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center shadow-lg z-50 mt-[10px]">
    
    {/* Total Amount */}
    <p className="text-lg text-white font-semibold text-center sm:text-left w-full sm:w-auto mb-2 sm:mb-0">
      Total:{" "}
      {currency}
      {cartData.reduce((acc, item) => {
        const productData = products.find(
          (product) => product._id === item._id
        );
        return acc + productData?.price * item.quantity;
      }, 0)}
    </p>

    {/* Checkout Button */}
    <button
      onClick={() => {
           if(cartData.length >0){
               navigate("/placeorder")
          } else{
               console.log("your cart is empty");
               toast.error("Your cart is empty")

               
          }
      }
         
       }
      className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold w-full sm:w-auto text-center"
    >
      Checkout →
    </button>

  </div>
)}

    </div>
  );
}

export default Cart;
