import Purchase from "../models/purchase.model.js";
import {generateUid} from "../utils/uid.js";
import Product from "../models/product.model.js";
import Vendor from "../models/vendor.model.js";

export const getPurchases = async (req, res) => {
    try {
        let {query} = req
        let {user} = res.locals
        let filter = {user: user?._id}
        let data = await Purchase.paginate(filter, {
            page: query.page || 1,
            limit: query.limit || 10,
            sort: {createdAt: -1},
            populate: {path: 'vendor', select: 'uid name'},
        })
        return res.status(200).send({
            error: false,
            msg: "Purchase data fetched successfully.",
            data
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}


export const getPurchaseElements = async (req, res) => {
    try {
        let {user} = res.locals
        let products = await Product.find({user: user?._id}, 'uid name cost')
        let vendors = await Vendor.find({user: user?._id}, 'uid name')
        return res.status(200).send({
            error: false,
            msg: "Purchases fetched successfully.",
            data: {
                products,
                vendors,
            }
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}

export const getPurchase = async (req, res) => {
    try {
        let {params} = req;
        let data = await Purchase.findById(params.uid)
        return res.status(200).send({
            error: false,
            msg: "Purchase fetched successfully.",
            data
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}


export const postPurchase = async (req, res) => {
    try {
        let {body} = req;
        let {user} = res.locals
        let uid = await generateUid('P-', Purchase)
        await Purchase.create({
            ...body,
            uid,
            user: user?._id,
        })
        return res.status(200).send({
            error: false,
            msg: "Purchase created successfully.",
        })
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}


export const patchPurchase = async (req, res) => {
    try {
        let {body, params} = req;
        let {user} = res.locals
        await Purchase.findOneAndUpdate({uid: params.uid, user: user?._id}, body)
        return res.status(200).send({
            error: false,
            msg: "Purchase updated successfully.",
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}

export const delPurchase = async (req, res) => {
    try {
        let {params} = req;
        let {user} = res.locals
        await Purchase.findOneAndDelete({uid: params.uid, user: user?._id})
        return res.status(200).send({
            error: false,
            msg: "Purchase deleted successfully.",
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}