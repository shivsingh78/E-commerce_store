import User from '../model/userModel.js'
// Add item to user's cart
export const addToCart = async (req, res) => {
     try {
          const { itemId, size } = req.body;  // Extract itemId and size from request body
          const userData = await User.findById(req.userId); // Find the user by ID from JWT/session
 
          // If user does not exist, return error
          if (!userData) {
               return res.status(404).json({ message: "User not found" });
          } 

          // Initialize cartData if it doesn't exist yet
          let cartData = userData.cartData || {};

          // Check if item already exists in cart
          if (cartData[itemId]) {
               // If the same size exists, increment quantity
               if (cartData[itemId][size]) {
                    cartData[itemId][size] += 1;
               } else {
                    // If size does not exist, start quantity from 1
                    cartData[itemId][size] = 1;
               }
          } else {
               // If item does not exist at all, create entry and set quantity = 1
               cartData[itemId] = {};
               cartData[itemId][size] = 1;
          }

          // Update the user's cart in DB safely using $set
          await User.findByIdAndUpdate(req.userId, { $set: { cartData } });

          return res.status(201).json({ message: "Added to cart" });

     } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "addToCart error" });
     }
}



// Update quantity of an item in the user's cart
export const UpdateCart = async (req, res) => {
     try {
          const { itemId, size, quantity } = req.body;  // Extract details from request
          const userData = await User.findById(req.userId); // Fetch user

          let cartData = userData.cartData;  // Get user's current cart

          // If the item doesn't exist in cart yet, create entry
          if (!cartData[itemId]) {
               cartData[itemId] = {};
          }

          // Update quantity for that size
          cartData[itemId][size] = quantity;

          // Save updated cart to DB
          await User.findByIdAndUpdate(req.userId, { $set: { cartData } });

          return res.status(201).json({ message: "Cart updated" });

     } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "updateCart error" });
     }
}



// Get the current cart of the user
export const getUserCart = async (req, res) => {
     try {
          const userData = await User.findById(req.userId); // Fetch user by ID
          let cartData = userData.cartData; // Extract cart

          return res.status(200).json(cartData); // Send cart as response

     } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "getUserCart error" });
     }
}
