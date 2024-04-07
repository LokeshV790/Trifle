import { getSavedPosts } from "@/app/mongodb/controllers/post.controller";

export async function POST(req, res) {
  
  const { id } = await req.json();
  
  const posts = await getSavedPosts(id);
  return Response.json({ posts });
}
