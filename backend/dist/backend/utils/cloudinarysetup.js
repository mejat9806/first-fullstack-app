import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinarysetup } from "cloudinary";
cloudinarysetup.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRECT,
});
console.log(process.env.CLOUDINARY_API_NAME, process.env.CLOUDINARY_API_KEY, "cloudinary env");
export default cloudinarysetup;
