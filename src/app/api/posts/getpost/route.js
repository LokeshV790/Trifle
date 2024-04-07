import { getPost } from "@/app/mongodb/controllers/post.controller";

export async function POST(req, res){
    const {id} = await req.json();
    const post = await getPost(id);


    return Response.json({status: 200, post:post})
}