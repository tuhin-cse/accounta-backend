import {Schema, model } from 'mongoose';

const schema = new Schema({
    uid: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    name: String,
    email: {
        type: String,
        unique: true,
        index: true,
    },
    password: String,
})

const User = model('user', schema);
export default User;