import { savePost } from "@/app/mongodb/controllers/user.controller";

export async function POST(req, res){
    const {id, postId} = await req.json();
    console.log(id, postId)
    await savePost(id, postId);
    return Response.json({status: 200})
}