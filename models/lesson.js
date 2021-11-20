import pkg from 'mongoose';
const { Schema, model } = pkg;

const lesson = new Schema({
    name: {
        type: String,
        required: true
    },
    teacherName: {
        type: "string",
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    }
})

export default model('Lesson', lesson)