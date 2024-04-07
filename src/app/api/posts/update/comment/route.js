import { comment } from "@/app/mongodb/controllers/post.controller";

export async function POST(req, res) {
  const { id } = await req.json();
  
  const comments = await comment(id);
  return Response.json({ status: 200, comments: comments });
}
