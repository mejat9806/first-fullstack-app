import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRECT,
});
console.log(process.env.CLOUDINARY_API_NAME, process.env.CLOUDINARY_API_KEY, "cloudinary env");
export default cloudinary;
