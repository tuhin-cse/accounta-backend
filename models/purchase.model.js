import {model} from "mongoose";

const Schema = new Schema({
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
    date: String,
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'vendor',
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
        },
        quantity: Number,
        price: Number,
        cost: Number,
    }],
    total: Number,
    paid: Number,
}, {timestamps: true})

const Purchase = model('purchase', Schema);
export default Purchase;