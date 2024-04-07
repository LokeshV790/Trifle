import mongoose, { Schema, mongo } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    savedPosts: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
      default: [],
    },
    repostedPosts: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
      default: [],
    },
    messages: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
