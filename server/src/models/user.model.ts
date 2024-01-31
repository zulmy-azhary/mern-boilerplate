import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 4,
      max: 24
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      min: 6
    },
    role: {
      type: String,
      enum: ["Admin", "User"]
    }
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
