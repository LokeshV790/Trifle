import { repost } from "@/app/mongodb/controllers/post.controller";

export async function POST(req, res) {
  const { id, userId } = await req.json();
  
  const reposts = await repost(id, userId);
  return Response.json({ status: 200, reposts: reposts });
}
