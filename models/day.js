import pkg from "mongoose";
const { Schema, model } = pkg;

const day = new Schema({
   name: {
      type: String,
      required: true,
   },
   lessons: [],
});

export default model("Day", day);
