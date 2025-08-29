import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";


export const addProduct = async (req,res) =>
      {
         try {
           let {name,description,price,category,subCategory,sizes,bestseller} = req.body;

           // Validate inputs
    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, Price, and Category are required" });
    }

    // Validate files
    if (!req.files || !req.files.image1) {
      return res.status(400).json({ message: "At least 1 image is required" });
    }
    console.log("REQ BODY:", req.body);
console.log("REQ FILES:", req.files);

           
           let image1 = await uploadOnCloudinary(req.files.image1[0].path)
           let image2 = await uploadOnCloudinary(req.files.image2[0].path)
           let image3 = await uploadOnCloudinary(req.files.image3[0].path)
           let image4 = await uploadOnCloudinary(req.files.image4[0].path)

           let productData = {
               name,
               description,
               price : Number(price) ,
               category,
               subCategory,
               sizes: JSON.parse(sizes),
               bestseller:bestseller === "true" ? true : false,
               date: Date.now() ,
               image1,
               image2,
               image3,
               image4

           }

           const product = await Product.create(productData)

           return res.status(201).json(product)
          
         } catch (error) {
          console.error("AddProduct error:", error); // <-- log full error
  return res.status(500).json({ message: `AddProduct error: ${error.message}` });
          
         }
          
     
}

export default addProduct 