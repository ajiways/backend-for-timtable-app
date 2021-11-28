import pkg from "mongoose";
const { Schema, model } = pkg;

const group = new Schema({
   name: {
      type: String,
      required: true,
   },
   timetableEven: [],
   timetableOdd: [],
   users: [],
});

export default model("Group", group);
