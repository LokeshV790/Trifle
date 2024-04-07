import { createMessage } from "@/app/mongodb/controllers/message.controller";

export async function POST(req, res) {
  const { id1, id2, content,by } = await req.json();
  await createMessage(id1, id2, by,content);

  return Response.json({ status: 200 });
}
