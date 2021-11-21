import pkg from 'mongoose';
const { Schema, model } = pkg;

const day = new Schema({
    name: {
        type: String,
        required: true
    },
    lessons: [],
    weekState: {
        type: Boolean,
        required: true
    }
})

export default model('Day', day)