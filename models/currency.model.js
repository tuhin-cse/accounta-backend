import {model, Schema} from "mongoose";

const schema = new Schema({
    name: String,
    code: String,
    symbol: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    rate: {
        type: Number,
        default: 1
    }
})



const Currency = model('currency', schema);
export default Currency;