import pkg from 'mongoose';
const { Schema, model } = pkg;

const lesson = new Schema({
    name: {
        type: String,
        required: true
    },
    teacherName: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
})

export default model('Lesson', lesson)