import mongoose, { Mongoose, Schema } from "mongoose";

const PostSchema = new Schema(
  {
    replyingTo: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: false,
    },
    repost: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    repostedBy: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    comments: {
      type: Number,
      default: 0,
    },
    reposts: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
