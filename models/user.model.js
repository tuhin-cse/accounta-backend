import {Schema, model } from 'mongoose';

const schema = new Schema({
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