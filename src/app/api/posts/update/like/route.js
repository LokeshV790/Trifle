import { like } from "@/app/mongodb/controllers/post.controller";

export async function POST(req, res) {
  
  const { id, userId } = await req.json();
  
  const likes = await like(id, userId);
  
  return Response.json({ status: 200, likes: likes });
}
