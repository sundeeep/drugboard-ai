import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


export default async function main(context){
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    return context.res.send("Hello, World!");
};


