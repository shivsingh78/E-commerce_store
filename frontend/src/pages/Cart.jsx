import React, { useContext, useEffect, useState } from "react";
import Title from "../component/Title";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import CartTotal from "../component/CartTotal";

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
    updateQuantity(productId, size, 0);
  };

  // Totals
  const subtotal = cartData.reduce((acc, item) => {
    const product = products.find((p) => p._id === item._id);
    return acc + (product?.price || 0) * item.quantity;
  }, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 bg-gradient-to-l from-[#141414] to-[#0c2025]">
      {/* Page Title */}
      <div className="text-center mt-20 mb-8">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items */}
      <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-[300px] sm:pb-16">
        {cartData.length === 0 ? (
          <p className="text-center text-gray-400">Your cart is empty.</p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((p) => p._id === item._id);

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

                {/* Middle */}
                <div className="flex-1 text-white text-center sm:text-left">
                  <h3 className="text-lg font-semibold">{productData?.name}</h3>
                  <p className="text-sm text-gray-400">Size: {item.size}</p>
                  <p className="text-sm text-gray-400">
                    Price: {currency}
                    {productData?.price}
                  </p>
                </div>

                {/* Right */}
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
                    <span className="text-white font-medium">
                      {item.quantity}
                    </span>
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

      {/* Cart Total */}
      {cartData.length > 0 && (
        <CartTotal
          currency={currency}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          onCheckout={() => {
            if (cartData.length > 0) {
              navigate("/placeorder");
            } else {
              toast.error("Your cart is empty");
            }
          }} 
        />
      )}
    </div>
  );
}

export default Cart;
