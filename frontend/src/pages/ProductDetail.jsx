import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from "../component/RelatedProduct";
import Loading from "../component/Loading";

function ProductDetail() {
  let { productId } = useParams();
  let { products, currency, addtoCart , loading } = useContext(shopDataContext);
  let [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage1(item.image1);
        setImage2(item.image2);
        setImage3(item.image3);
        setImage4(item.image4);
        setImage(item.image1);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="w-full">
      {/* Top Section */}
      <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col lg:flex-row items-center justify-start gap-6 px-4 sm:px-6 md:px-10 lg:px-16 py-10">
        {/* Images */}
        <div className="w-full lg:w-1/2 flex flex-col-reverse lg:flex-row gap-4 items-center">
          {/* Thumbnail Images */}
          <div className="flex lg:flex-col gap-3 sm:gap-4 flex-wrap justify-center">
            {[image1, image2, image3, image4].map(
              (img, i) =>
                img && (
                  <div
                    key={i}
                    className="w-14 h-14 sm:w-20 sm:h-24 border rounded-md overflow-hidden cursor-pointer"
                    onClick={() => setImage(img)}
                  >
                    <img
                      src={img}
                      alt={`thumb-${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )
            )}
          </div>

          {/* Main Image */}
          <div className="w-4/5 sm:w-3/4 lg:w-[60%] border rounded-md overflow-hidden">
            <img
              src={image}
              alt="product"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 text-white flex flex-col gap-4 sm:gap-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {productData.name.toUpperCase()}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-400">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
            <p className="text-sm sm:text-base font-medium text-white pl-2">
              (128)
            </p>
          </div>

          {/* Price */}
          <p className="text-xl sm:text-2xl font-semibold">
            {currency} {productData.price}
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-200">
            {productData.description} and Stylish, breathable cotton shirt with
            a modern slim fit, Easy to wash, super comfortable, and designed for
            effortless style.
          </p>

          {/* Size Options */}
          <div>
            <p className="text-lg sm:text-xl font-semibold mb-2 ">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`border py-2 px-4 rounded-md ${
                    item === size
                      ? "bg-black text-[#2f97f1] text-lg"
                      : "bg-slate-300 text-black cursor-pointer"
                  }`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Add to Cart Button */}
            <button
              className="mt-4 bg-[#495b61c9] px-5 py-2 rounded-xl border border-gray-500 text-white text-sm sm:text-base shadow-md active:bg-slate-500 cursor-pointer" 
              onClick={() => addtoCart(productData._id, size)}   disabled={loading}
            >
              {loading ? <Loading /> : "Add To Cart"}
            </button>
          </div>

          {/* Info Section */}
          <div className="w-full h-px bg-slate-700 my-4"></div>
          <div className="text-sm sm:text-base text-gray-300 space-y-1">
            <p>✅ 100% Original Product</p>
            <p>✅ Cash on delivery available</p>
            <p>✅ Easy return & exchange policy (7 days)</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="w-full bg-gradient-to-l from-[#141414] to-[#0c2025] py-10 px-4 sm:px-6 md:px-12">
        <div className="flex gap-4 mb-6">
          <p className="border px-4 py-2 text-sm sm:text-base text-white cursor-pointer">
            Description
          </p>
          <p className="border px-4 py-2 text-sm sm:text-base text-white cursor-pointer">
            Reviews
          </p>
        </div>

        <div className="w-full sm:w-4/5 lg:w-3/4 bg-[#3336397c] border text-white text-sm sm:text-base lg:text-lg p-4 sm:p-6">
          <p>
            Upgrade your wardrobe with this stylish slim-fit cotton shirt,
            available now on E-Store. Crafted from breathable, high-quality
            fabric, it offers all-day comfort and effortless style. Easy to
            maintain and perfect for any setting, this shirt is a must-have
            essential for those who value both fashion and function.
          </p>
        </div>

        {/* Related Products */}
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default ProductDetail;
