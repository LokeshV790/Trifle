import { User } from "@/app/mongodb/models/user.model";
import { connectDatabase } from "@/app/utils/connectDatabase";

export async function POST(req, res) {
  await connectDatabase();
  const { username, id } = await req.json();
  let user;
  if (username) {
    user = await User.findOne({ username: username });
  } else if (id) {
    user = await User.findById(id);
  }

  return Response.json({ user });
}
