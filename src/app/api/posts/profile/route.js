import { getUserPosts } from "@/app/mongodb/controllers/post.controller";

export async function POST(req, res) {
  
  const { page,id } = await req.json();
  
  const posts = await getUserPosts(page, id);
  return Response.json({ posts });
}
