"use server";
import { revalidatePath } from "next/cache";
import { createPost, getPosts } from "../controllers/post.controller";
import { getServerSession } from "next-auth";
import { getUserDetails } from "../controllers/user.controller";
import { redirect } from "next/navigation";
export async function createPostAction(
  content,
  image,
  repost,
  replyingTo,
  shouldRedirect = false
) {
  const session = await getServerSession();

  const { id } = await getUserDetails(session.user.email);

  await createPost({
    createdBy: id,
    content: content,
    repost: repost,
    image: image,
    replyingTo: replyingTo,
  });
  revalidatePath("/home");
  if (shouldRedirect) {
    redirect("/home");
  }
}
