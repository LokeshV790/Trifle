import { getPosts } from "@/app/mongodb/controllers/post.controller";

export  async function POST(req,res){
    const {page} = await req.json();
    const posts = await getPosts(page);
    return Response.json({posts});
}