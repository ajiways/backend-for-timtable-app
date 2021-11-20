import pkg from 'mongoose';
const { Schema, model } = pkg;

const group = new Schema({
    name: {
        type: String,
        required: true
    },
    timetable: {
        type: Array,
        required: true
    }
})

export default model('Group', group)