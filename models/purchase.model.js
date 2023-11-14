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
    date: Date,
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
        cost: Number,
        subtotal: Number,
    }],
    subtotal: Number,
    vat: Number,
    total_vat: Number,
    discount: Number,
    total: Number,
    paid: Number,
}, {timestamps: true})

schema.plugin(paginate)
const Purchase = model('purchase', schema);
export default Purchase;