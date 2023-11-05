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
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    description: String,
    price: Number,
    cost: Number,
    type: {
        type: String,
        enum: ['product', 'service']
    }
})

schema.plugin(paginate)

const Product = model('product', schema);
export default Product;