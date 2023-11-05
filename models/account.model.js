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
    name: String,
    type: {
        type: String,
        enum: ['bank', 'card', 'cash', 'other']
    },
    currency: {
        type: Schema.Types.ObjectId,
        ref: 'currency'
    },
    number: String,
    initial_balance: Number,
    bank: {
        name: String,
        branch: String,
        address: String,
    },
    default: {
        type: Boolean,
        default: false,
    }
})

schema.plugin(paginate)
const Account = model('account', schema)
export default Account;