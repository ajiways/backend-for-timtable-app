import pkg from 'mongoose';
const { Schema, model } = pkg;

const group = new Schema({
    name: {
        type: String,
        required: true
    },
    timetable: [
        {
            type: String,
            ref: 'Day'
        }
    ],
    users: [
        {
            type: String,
            ref: 'User'
        }
    ]
})

export default model('Group', group)