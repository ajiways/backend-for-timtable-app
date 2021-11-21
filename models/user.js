import pkg from 'mongoose';
const { Schema, model } = pkg;

const user = new Schema({ 
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    group: {
        type: String,
        ref: 'Group'
    },
    roles: [
        {
            type: String,
            ref: 'Role'
        }
    ]
})


export default model('User', user)