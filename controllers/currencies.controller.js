import Currency from "../models/currency.model.js";
import {generateUid} from "../utils/uid.js";

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
            msg: "Currencies fetched successfully",
            data
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
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
            msg: "Currency fetched successfully",
            data
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}

export const postCurrency = async (req, res) => {
    try {
        let {user} = res.locals
        let {body} = req
        let uid = await generateUid('C-', Currency)
        await Currency.create({...body, uid, user: user?._id})
        return res.status(200).send({
            error: false,
            msg: "Currency created successfully",
        })
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}

export const patchCurrency = async (req, res) => {
    try {
        let {user} = res.locals
        let {body} = req
        let {uid} = req.params
        let currency = await Currency.findOne({user: user?._id, uid})
        if (!currency) {
            return res.status(404).send({
                error: true,
                msg: "Currency not found"
            })
        }
        !!body.name && (currency.name = body.name)
        !!body.code && (currency.code = body.code)
        !!body.symbol && (currency.symbol = body.symbol)
        !!body.rate && (currency.rate = body.rate)
        await currency.save()
        return res.status(200).send({
            error: false,
            msg: "Currency updated successfully",
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
        await Currency.findOneAndDelete({user: user?._id, uid})
        return res.status(200).send({
            error: false,
            msg: "Currency deleted successfully.",
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}