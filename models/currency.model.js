import {model, Schema} from "mongoose";

const schema = new Schema({
    uid: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    name: String,
    code: String,
    symbol: String,
    rate: {
        type: Number,
        default: 1
    }
})



const Currency = model('currency', schema);
export default Currency;