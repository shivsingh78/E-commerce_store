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

          let image1 = req.files?.image1 ? await uploadOnCloudinary(req.files.image1[0].path) : null;
let image2 = req.files?.image2 ? await uploadOnCloudinary(req.files.image2[0].path) : null;
let image3 = req.files?.image3 ? await uploadOnCloudinary(req.files.image3[0].path) : null;
let image4 = req.files?.image4 ? await uploadOnCloudinary(req.files.image4[0].path) : null;

 if (!image1 || !image2 || !image3 || !image4) {
  return res.status(400).json({ message: "All 4 images are required" });
}

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

export const listProduct = async (req,res) => {
  try {
    const product = await Product.find({})
    return res.status(200).json(product || [])
  } catch (error) {
    return res.status(500).json({ message: `ListProduct error: ${error.message}` });
  }
}



export const removeProduct = async (req, res) => {
  try {
    console.log("Remove route hit:", req.params.id);

    let { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted", product });
  } catch (error) {
    return res.status(500).json({ message: `RemoveProduct error: ${error.message}` });
  }
};
