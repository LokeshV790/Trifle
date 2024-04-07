import { connectDatabase } from "../../utils/connectDatabase";
import { User } from "../models/user.model";
export async function createUser(profile) {
  console.log(profile);

  await connectDatabase();
  const existUser = await User.findOne({ email: profile.email });

  if (!existUser) {
    const username = profile.email.slice(0, profile.email.indexOf("@"));
    const user = await User.create({
      username: username,
      fullName: profile.name,
      email: profile.email,
      avatar: profile.picture,
    });
    console.log("User created");
  } else {
    console.log("User already exists");
  }
}

export async function getUserDetailsById(id) {
  await connectDatabase();
  const user = await User.findById(id);
  return {
    username: user.username,
    fullName: user.fullName,
    avatar: user.avatar,
  };
}

export async function getUserDetails(email) {
  await connectDatabase();

  const user = await User.findOne({ email: email });
  return {
    id: user._id,
    username: user.username,
    fullName: user.fullName,
    avatar: user.avatar,
    savedPosts: user.savedPosts
  };
}

export async function savePost(id, postId) {
  await connectDatabase();
  const user = await User.findByIdAndUpdate(
    id,
    { $push: { savedPosts: postId } },
    { new: true }
  );
  console.log(user);
}

export async function unsavePost(id, postId) {
  await connectDatabase();
  const user = await User.findByIdAndUpdate(
    id,
    { $pull: { savedPosts: postId } },
    { new: true }
  );
  console.log(user);
}

export async function getUserMessaging(userId){
  await connectDatabase();
  const user = await User.findById(userId).populate("messages");
  return user.messages.reverse();
  
}

export async function addUserToMessaging(userId, id){
  await connectDatabase();
  const user = await User.findById(userId);
  if(user.messages.includes(id)==false){
    user.messages.push(id);
    user.save();
  }
}

