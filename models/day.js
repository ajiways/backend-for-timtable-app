import pkg from 'mongoose';
const { Schema, model } = pkg;

const day = new Schema({
    name: {
        type: String,
        required: true
    },
    lessons: {
        type: Array,
        required: true
    },
    week: {
        type: Number,
        required: true
    },
    dayNumber: {
        type: Number,
        required: true
    }
})

export default model('Day', day)