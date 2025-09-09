import React, { useContext, useMemo } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const CartTotal = ({ showButton = true }) => {
  const { products, cartItem, currency } = useContext(shopDataContext);
  const navigate = useNavigate();

  // Calculate totals
  const { subtotal, shipping, total } = useMemo(() => {
    let subtotalCalc = 0;
    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        if (cartItem[productId][size] > 0) {
          const product = products.find((p) => p._id === productId);
          if (product) {
            subtotalCalc += product.price * cartItem[productId][size];
          }
        }
      }
    }

    const shippingFee = subtotalCalc > 0 ? 40 : 0; // example flat fee
    const totalCalc = subtotalCalc + shippingFee;

    return { subtotal: subtotalCalc, shipping: shippingFee, total: totalCalc };
  }, [cartItem, products]);

  return (
    <div className="w-full max-w-md mx-auto bg-[#1a2a2f] rounded-xl shadow-lg border border-gray-700 text-white p-5 mt-8 mb-20 sm:mb-0">
      {/* Title */}
      <h2 className="text-xl font-semibold text-teal-300 mb-4 text-center sm:text-left">
        CART TOTALS
      </h2>

      {/* Subtotal */}
      <div className="flex justify-between items-center border-b border-gray-700 py-2">
        <span className="text-gray-300">Subtotal</span>
        <span className="font-medium">
          {currency}
          {subtotal.toFixed(2)}
        </span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between items-center border-b border-gray-700 py-2">
        <span className="text-gray-300">Shipping Fee</span>
        <span className="font-medium">
          {currency}
          {shipping.toFixed(2)}
        </span>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center py-2 text-lg font-semibold">
        <span>Total</span>
        <span className="text-teal-300">
          {currency}
          {total.toFixed(2)}
        </span>
      </div>

      {/* Checkout Button */}
      {showButton && (
        <button
          onClick={() => navigate("/placeorder")}
          className="w-full mt-5 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform cursor-pointer"
        >
          Proceed to Checkout →
        </button>
      )}
    </div>
  );
};

export default CartTotal;
