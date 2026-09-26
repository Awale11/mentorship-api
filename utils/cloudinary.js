import { v2 as cloudinary } from 'cloudinary'
// this file index.js mageeni doono that s y dotenv-ka halkan ayan kuso import gareenay
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export default cloudinary;