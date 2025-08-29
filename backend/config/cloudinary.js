import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';
import fs from 'fs'

const uploadOnCloudinary = async (filePath) => {
     
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY , 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    try {
     if(!filePath){
     return null
    }
     const uploadResult = await cloudinary.uploader
       .upload(filePath)
       fs.unlinkSync(filePath)
       return uploadResult.secure_url
    } catch (error) {
     fs.unlink(filePath, (err) => {
  if (err) console.error("Failed to delete temp file:", err);
});

     
      
    }
     
}


export default uploadOnCloudinary