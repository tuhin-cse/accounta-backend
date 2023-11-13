import {generateUid} from "../utils/uid.js";
import Customer from "../models/customer.model.js";
import Vendor from "../models/vendor.model.js";

export const getVendors = async (req, res) => {
    try {
        let {query} = req
        let {user} = res.locals
        let filter = {user: user?._id}
        let data = await Vendor.paginate(filter, {
            page: query.page || 1,
            limit: query.limit || 10,
            sort: {createdAt: -1},
        })
        return res.status(200).send({
            error: false,
            msg: "Vendors fetched successfully",
            data
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}

export const getVendor = async (req, res) => {
    try {
        let {user} = res.locals
        let {uid} = req.params
        let data = await Vendor.findOne({user: user?._id, uid})
        return res.status(200).send({
            error: false,
            msg: "Vendor fetched successfully",
            data
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}

export const postVendor = async (req, res) => {
    try {
        let {user} = res.locals
        let {body} = req
        let uid = await generateUid('V-', Customer)
        await Vendor.create({...body, uid, user: user?._id})
        return res.status(200).send({
            error: false,
            msg: "Vendor created successfully",
        })
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}

export const patchVendor = async (req, res) => {
    try {
        let {user} = res.locals
        let {body} = req
        let {uid} = req.params
        let vendor = await Vendor.findOne({user: user?._id, uid})
        if (!vendor) {
            return res.status(404).send({
                error: true,
                msg: "Vendor not found"
            })
        }
        !!body.name && (Vendor.name = body.name)
        !!body.email && (Vendor.email = body.email)
        !!body.phone && (Vendor.phone = body.phone)
        !!body.address && (Vendor.rate = body.address)
        !!body.business && (vendor.business = body.business)
        await Vendor.save()
        return res.status(200).send({
            error: false,
            msg: "Vendor updated successfully",
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}


export const delVendor = async (req, res) => {
    try {
        let {user} = res.locals
        let {uid} = req.params
        await Vendor.findOneAndDelete({user: user?._id, uid})
        return res.status(200).send({
            error: false,
            msg: "Vendor deleted successfully.",
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}