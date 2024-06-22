import app from './app.js';
import cloudinary from 'cloudinary';

// configuration settings for the cloudinary
cloudinary.v2.config({
   cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
   api_key: process.env.CLOUDINARY_CLIENT_API,
   api_secret: process.env.CLOUDINARY_CLIENT_SECRET
})
// app will listen the port number
 app.listen(process.env.PORT,()=>{
    console.log(`server runing on ${process.env.PORT}`);
 });