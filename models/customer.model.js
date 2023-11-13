import {model, Schema} from "mongoose";
import {paginate} from "../utils/mongoose.js";

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
    name: {
        type: String,
        required: true,
    },
    email: String,
    phone: String,
    address: String,

}, {timestamps: true})

schema.plugin(paginate)
const Customer = model('customer', schema)
export default Customer;