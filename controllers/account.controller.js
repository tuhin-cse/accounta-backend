import Account from "../models/account.model.js";
import Currency from "../models/currency.model.js";
import {generateUid} from "../utils/uid.js";
import mongoose from "mongoose";

export const getAccounts = async (req, res) => {
    try {
        let {query} = req
        let {user} = res.locals
        let filter = {user: user?._id}
        let data = await Account.paginate(filter, {
            page: query.page || 1,
            limit: query.limit || 10,
            sort: {createdAt: -1},
            populate: {
                path: 'currency',
                select: 'name symbol'
            }
        })
        return res.status(200).send({
            error: false,
            msg: "Accounts fetched successfully.",
            data
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}

export const getAccount = async (req, res) => {
    try {
        let {user} = res.locals
        let {uid} = req.params
        let data = await Account.findOne({user: user?._id, uid})
        return res.status(200).send({
            error: false,
            msg: "Account fetched successfully.",
            data
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}


export const getAccountElements = async (req, res) => {
    try {
        let {user} = res.locals
        let currencies = await Currency.find({user: user?._id}, '_id name')
        return res.status(200).send({
            error: false,
            msg: "Account elements fetched successfully",
            data: currencies
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }

}


export const postAccount = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        let {user} = res.locals
        let {body} = req
        let uid = await generateUid('A-', Account)
        if (body?.default === true) {
            await Account.updateMany({user: user?._id}, {default: false}, {session})
        }
        await Account.create([{...body, user: user?._id, uid}], {session})
        await session.commitTransaction();
        return res.status(200).send({
            error: false,
            msg: "Account created successfully",
        })
    } catch (e) {
        await session.abortTransaction();
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    } finally {
        await session.endSession();
    }
}

export const patchAccount = async (req, res) => {
    try {
        let {user} = res.locals
        let {body} = req
        let {uid} = req.params
        let account = await Account.findOne({user: user?._id, uid})
        if (body?.default !== undefined) {
            if (body?.default === true) {
                await Account.updateMany({user: user?._id}, {default: false})
            }
            if(account?.default === true && body?.default === false){
                return res.status(400).send({
                    error: true,
                    msg: "You can't remove default account"
                })
            }
        }
        await Account.findOneAndUpdate({user: user?._id, uid}, body)
        return res.status(200).send({
            error: false,
            msg: "Account updated successfully",
            data: account
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}


export const delAccount = async (req, res) => {
    try {
        let {user} = res.locals
        let {uid} = req.params
        await Account.findOneAndDelete({user: user?._id, uid})
        return res.status(200).send({
            error: false,
            msg: "Account deleted successfully",
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}