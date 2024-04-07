import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(stream){
  return new Promise((resolve, reject) => {
    cloudinary.uploader
    .upload_stream({ resource_type: "image" }, (error, result) => {
      if (error) {
        console.error("Error uploading to Cloudinary:", error);
        return reject(error)
      } else {
        // Not printing even though file is saved
        return resolve(result)
      }
    })
    .end(stream);
  })
}

export async function POST(req, res) {
  const formData = await req.formData();
  const image = formData.get("image");
  const fileBuffer = await image.arrayBuffer();
  const fileStream = Buffer.from(fileBuffer);
  const data = await uploadToCloudinary(fileStream)
 
  return Response.json({ status: 200, result: data});
}
