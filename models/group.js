import pkg from 'mongoose';
const { Schema, model } = pkg;

const group = new Schema({
    name: {
        type: String,
        required: true
    },
    timetable: [],
    users: []
})

export default model('Group', group)