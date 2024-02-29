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
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    }
}, {timestamps: true})

schema.plugin(paginate)

const Category = model('category', schema);
export default Category;