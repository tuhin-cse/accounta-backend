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
    }],
    total: Number,
    paid: Number,
}, {timestamps: true})

const Sale = model('sale', Schema);
export default Sale;