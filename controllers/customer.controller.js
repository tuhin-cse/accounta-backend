import {generateUid} from "../utils/uid.js";
import Customer from "../models/customer.model.js";

export const getCustomers = async (req, res) => {
    try {
        let {query} = req
        let {user} = res.locals
        let filter = {user: user?._id}
        let data = await Customer.paginate(filter, {
            page: query.page || 1,
            limit: query.limit || 10,
            sort: {createdAt: -1},
        })
        return res.status(200).send({
            error: false,
            msg: "Customers fetched successfully",
            data
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}

export const getCustomer = async (req, res) => {
    try {
        let {user} = res.locals
        let {uid} = req.params
        let data = await Customer.findOne({user: user?._id, uid})
        return res.status(200).send({
            error: false,
            msg: "Customer fetched successfully",
            data
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}

export const postCustomer = async (req, res) => {
    try {
        let {user} = res.locals
        let {body} = req
        let uid = await generateUid('CU-', Customer)
        await Customer.create({...body, uid, user: user?._id})
        return res.status(200).send({
            error: false,
            msg: "Customer created successfully",
        })
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}

export const patchCustomer = async (req, res) => {
    try {
        let {user} = res.locals
        let {body} = req
        let {uid} = req.params
        let customer = await Customer.findOne({user: user?._id, uid})
        if (!customer) {
            return res.status(404).send({
                error: true,
                msg: "Customer not found"
            })
        }
        !!body.name && (customer.name = body.name)
        !!body.email && (customer.email = body.email)
        !!body.phone && (customer.phone = body.phone)
        !!body.address && (customer.rate = body.address)
        await customer.save()
        return res.status(200).send({
            error: false,
            msg: "Customer updated successfully",
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}


export const delCustomer = async (req, res) => {
    try {
        let {user} = res.locals
        let {uid} = req.params
        await Customer.findOneAndDelete({user: user?._id, uid})
        return res.status(200).send({
            error: false,
            msg: "Customer deleted successfully.",
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}