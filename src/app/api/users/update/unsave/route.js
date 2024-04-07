import { unsavePost } from "@/app/mongodb/controllers/user.controller";

export async function POST(req, res){
    const {id, postId} = await req.json();
    console.log(id, postId)
    await unsavePost(id, postId);
    return Response.json({status: 200})
}