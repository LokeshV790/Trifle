import { getComments } from "@/app/mongodb/controllers/post.controller";

export async function POST(req, res){
    const {id} = await req.json();
    const posts = await getComments(id);

    return Response.json({status: 200, comments: posts})
}