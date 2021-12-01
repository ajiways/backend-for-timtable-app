import pkg from "mongoose";
const { Schema, model } = pkg;

const user = new Schema({
   username: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   group: {
      type: String,
      ref: "Group",
   },
   role: {
      type: String,
      default: "USER",
   },
});

export default model("User", user);
