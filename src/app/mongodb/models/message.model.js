import mongoose, { Mongoose, Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    users: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    by: {
      type: Schema.Types.ObjectId,
      required: true,
    }
  },
  { timestamps: true }
);

export const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);
