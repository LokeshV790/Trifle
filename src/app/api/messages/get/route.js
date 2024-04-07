import { getMessages } from "@/app/mongodb/controllers/message.controller";

export async function POST(req, res) {
  const { id1, id2 } = await req.json();
  const messages = await getMessages(id1, id2);
  return Response.json({ status: 200, messages });
}
