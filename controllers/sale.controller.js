import {generateUid} from "../utils/uid.js";
import Product from "../models/product.model.js";
import Sale from "../models/sale.model.js";
import Customer from "../models/customer.model.js";

export const getSales = async (req, res) => {
    try {
        let {query} = req
        let {user} = res.locals
        let filter = {user: user?._id}
        let data = await Sale.paginate(filter, {
            page: query.page || 1,
            limit: query.limit || 10,
            sort: {createdAt: -1},
            populate: {path: 'customer', select: 'uid name'},
        })
        return res.status(200).send({
            error: false,
            msg: "Sales fetched successfully.",
            data
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}


export const getSaleElements = async (req, res) => {
    try {
        let {user} = res.locals
        let products = await Product.find({user: user?._id}, 'uid name price')
        let customers = await Customer.find({user: user?._id}, 'uid name')
        return res.status(200).send({
            error: false,
            msg: "Sale data fetched successfully.",
            data: {
                products,
                customers,
            }
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}

export const getSale = async (req, res) => {
    try {
        let {params} = req;
        let data = await Sale.findById(params.uid)
        return res.status(200).send({
            error: false,
            msg: "Sale fetched successfully.",
            data
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}


export const postSale = async (req, res) => {
    try {
        let {body} = req;
        let {user} = res.locals
        let uid = await generateUid('S-', Sale)
        await Sale.create({
            ...body,
            uid,
            user: user?._id,
        })
        return res.status(200).send({
            error: false,
            msg: "Sale created successfully.",
        })
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}


export const patchSale = async (req, res) => {
    try {
        let {body, params} = req;
        let {user} = res.locals
        await Sale.findOneAndUpdate({uid: params.uid, user: user?._id}, body)
        return res.status(200).send({
            error: false,
            msg: "Sale updated successfully.",
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}

export const delSale = async (req, res) => {
    try {
        let {params} = req;
        let {user} = res.locals
        await Sale.findOneAndDelete({uid: params.uid, user: user?._id})
        return res.status(200).send({
            error: false,
            msg: "Sale deleted successfully.",
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}