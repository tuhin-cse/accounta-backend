import {model, Schema} from "mongoose";

const schema = new Schema({
    name: String,
    type: {
        type: String,
        enum: ['bank', 'credit_card', 'cash', 'other']
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
    }
})

const Account = model('account', schema)
export default Account;