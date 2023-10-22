import {Schema, model } from 'mongoose';

const schema = new Schema({
    uid: {
        type: String,
        unique: true,
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

const User = model('User', schema);
export default User;