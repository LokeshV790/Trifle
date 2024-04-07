import { addUserToMessaging } from "@/app/mongodb/controllers/user.controller";

export async function POST(req, res) {
  const { userId, id } = await req.json();
  await addUserToMessaging(userId, id);
  return Response.json({ status: 200 });
}
