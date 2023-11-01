import Currency from "../models/currency.model.js";

export const getCurrencies = async (req, res) => {
    try {
        let {query} = req
        let {user} = res.locals
        let filter = {user: user?._id}
        let data = await Currency.paginate(filter, {
            page: query.page || 1,
            limit: query.limit || 10,
            sort: {createdAt: -1},
        })
        return res.status(200).send({
            error: false,
            msg: "Currencies fetched successfully.",
            data
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}

export const getCurrency = async (req, res) => {
    try {
        let {user} = res.locals
        let {uid} = req.params
        let data = await Currency.findOne({user: user?._id, uid})
        return res.status(200).send({
            error: false,
            msg: "Currency fetched successfully.",
            data
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}

export const postCurrency = async (req, res) => {
    try {
        let {user} = res.locals
        let {body} = req
        let currency = await Currency.create({...body, user: user?._id})
        return res.status(200).send({
            error: false,
            msg: "Currency created successfully.",
            data: currency
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}

export const patchCurrency = async (req, res) => {
    try {
        let {user} = res.locals
        let {body} = req
        let {uid} = req.params
        let currency = await Currency.findOneAndUpdate({user: user?._id, uid}, body, {new: true})
        return res.status(200).send({
            error: false,
            msg: "Currency updated successfully.",
            data: currency
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}


export const delCurrency = async (req, res) => {
    try {
        let {user} = res.locals
        let {uid} = req.params
        let currency = await Currency.findOneAndDelete({user: user?._id, uid})
        return res.status(200).send({
            error: false,
            msg: "Currency deleted successfully.",
            data: currency
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}