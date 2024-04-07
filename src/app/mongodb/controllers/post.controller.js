import { Post } from "../models/post.model";
import mongoose, { ObjectId, connect } from "mongoose";
import { connectDatabase } from "@/app/utils/connectDatabase";
import { User } from "../models/user.model";

const n = 5;

export async function createPost({
  createdBy,
  content,
  image,
  repost,
  replyingTo,
}) {
  await connectDatabase();
  try {
    const post = await Post.create({
      createdBy: new mongoose.Types.ObjectId(createdBy),
      content: content,
      image: image,
      repost: repost,
      replyingTo: replyingTo,
    });
    console.log(post);
  } catch (error) {
    console.log(error);
  }
}

export async function getPosts(page) {
  await connectDatabase();
  const posts = await Post.find({}, null, { limit: n, skip: n * page })
    .sort({ createdAt: -1 })
    .populate({ path: "createdBy" })
    .populate([
      { path: "repost", populate: "createdBy" },
      { path: "replyingTo", populate: "createdBy" },
    ]);

  return posts;
}

export async function getUserPosts(page, id) {
  await connectDatabase();
  const posts = await Post.find({ createdBy: id }, null, {
    limit: n,
    skip: n * page,
  })
    .sort({ createdAt: -1 })
    .populate({ path: "createdBy" })
    .populate([
      { path: "repost", populate: "createdBy" },
      { path: "replyingTo", populate: "createdBy" },
    ]);

  return posts;
}

export async function getLikedPosts(page, id) {
  await connectDatabase();
  const posts = await Post.find({ likedBy: { $in: [id] } }, null, {
    limit: n,
    skip: n * page,
  })
    .sort({ createdAt: -1 })
    .populate({ path: "createdBy" })
    .populate([
      { path: "repost", populate: "createdBy" },
      { path: "replyingTo", populate: "createdBy" },
    ]);

  return posts;
}


export async function getPost(id) {
  await connectDatabase();
  const existPost = await Post.findById(id).populate([
    { path: "createdBy" },
    { path: "repost", populate: "createdBy" },
    { path: "replyingTo", populate: "createdBy" },
  ]);
  console.log(existPost);
  return existPost;
}


export async function getSavedPosts(id) {
  await connectDatabase();
  const user = await User.findById(id)
    .populate("savedPosts")
    .populate({
      path: "savedPosts",
      populate: [
        {
          path: "createdBy",
        },
        {
          path: "repost",
          populate: "createdBy",
        },
        { path: "replyingTo", populate: "createdBy" },
      ],
    }).sort({"savedPosts.createdAt" : -1});

  console.log(user.savedPosts);

  return user.savedPosts;
}

export async function getComments(id){
  await connectDatabase()
  const posts = await Post.find({replyingTo: id}).populate({path: "createdBy"}).sort({createdAt: -1})
  return posts;
}


export async function like(id, userId) {
  console.log("hi");
  await connectDatabase();
  const existPost = await Post.findByIdAndUpdate(
    id,
    {
      $inc: { likes: 1 },
      $push: { likedBy: userId },
    },
    { new: true }
  );
  console.log(existPost);
  return existPost.likes;
}


export async function repost(id, userId) {
  await connectDatabase();
  const existPost = await Post.findByIdAndUpdate(
    id,
    {
      $inc: { reposts: 1 },
      $push: { repostedBy: userId },
    },
    { new: true }
  );
  console.log(existPost);
  return existPost.reposts;
}


export async function unlike(id, userId) {
  await connectDatabase();
  const existPost = await Post.findByIdAndUpdate(
    id,
    {
      $inc: { likes: -1 },
      $pull: { likedBy: userId },
    },
    { new: true }
  );
  return existPost.likes;
  console.log(existPost);
}

export async function comment(id) {
  await connectDatabase();
  const existPost = await Post.findByIdAndUpdate(
    id,
    {
      $inc: { comments: 1 },
    },
    { new: true }
  );
  return existPost.comments;
  console.log(existPost);
}
