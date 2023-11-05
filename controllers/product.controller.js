import {generateUid} from "../utils/uid.js";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        let {query} = req
        let {user} = res.locals
        let filter = {user: user?._id}
        let data = await Product.paginate(filter, {
            page: query.page || 1,
            limit: query.limit || 10,
            sort: {createdAt: -1},
            populate: {
                path: 'category',
                select: 'name'
            }
        })
        return res.status(200).send({
            error: false,
            msg: "Products fetched successfully.",
            data
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}

export const getProduct = async (req, res) => {
    try {
        let {user} = res.locals
        let {uid} = req.params
        let data = await Product.findOne({user: user?._id, uid})
        return res.status(200).send({
            error: false,
            msg: "Product fetched successfully.",
            data
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}



export const postProduct = async (req, res) => {
    try {
        let {user} = res.locals
        let {body} = req
        let uid = await generateUid('P-', Product)
        await Product.create({...body, user: user?._id, uid})
        return res.status(200).send({
            error: false,
            msg: "Product created successfully",
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}

export const patchProduct = async (req, res) => {
    try {
        let {user} = res.locals
        let {body} = req
        let {uid} = req.params
        await Product.findOneAndUpdate({user: user?._id, uid}, body)
        return res.status(200).send({
            error: false,
            msg: "Product updated successfully",
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}


export const delProduct = async (req, res) => {
    try {
        let {user} = res.locals
        let {uid} = req.params
        await Product.findOneAndDelete({user: user?._id, uid})
        return res.status(200).send({
            error: false,
            msg: "Product deleted successfully",
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}