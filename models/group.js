import pkg from 'mongoose';
const { Schema, model } = pkg;

const group = new Schema({
    name: {
        type: String,
        required: true
    },
    timetable: {
        type: Array,
        required: false
    },
    users: {
        type: Array,
        required: false
    }
})

export default model('Group', group)