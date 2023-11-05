import {generateUid} from "../utils/uid.js";
import Category from "../models/category.model.js";
import mongoose from "mongoose";

export const getCategories = async (req, res) => {
    try {
        let {query} = req
        let {user} = res.locals
        let filter = {user: user?._id}
        let data = await Category.paginate(filter, {
            page: query.page || 1,
            limit: query.limit || 10,
            sort: {createdAt: -1},
            populate: {
                path: 'parent',
                select: 'name'
            }
        })
        return res.status(200).send({
            error: false,
            msg: "Categories fetched successfully",
            data
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}


export const getCategoryElements = async (req, res) => {
    try {
        let {user} = res.locals
        let categories = await Category.aggregate([
            {$match: {user: new mongoose.Types.ObjectId(user?._id), parent: null}},
            {$lookup: {from: 'categories', localField: '_id', foreignField: 'parent', as: 'children'}},
            {
                $project: {
                    _id: 1,
                    name: 1,
                    children: {
                        _id: 1,
                        name: 1
                    }
                }
            }
        ])
        return res.status(200).send({
            error: false,
            msg: "Category elements fetched successfully",
            data: categories
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}

export const getCategory = async (req, res) => {
    try {
        let {user} = res.locals
        let {uid} = req.params
        let data = await Category.findOne({user: user?._id, uid})
        return res.status(200).send({
            error: false,
            msg: "Category fetched successfully",
            data
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}

export const postCategory = async (req, res) => {
    try {
        let {user} = res.locals
        let {body} = req
        let uid = await generateUid('C-', Category)
        await Category.create({...body, uid, user: user?._id})
        return res.status(200).send({
            error: false,
            msg: "Category created successfully",
        })
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            error: true,
            msg: "Something went wrong"
        })
    }
}

export const patchCategory = async (req, res) => {
    try {
        let {user} = res.locals
        let {body} = req
        let {uid} = req.params
        let category = await Category.findOne({user: user?._id, uid})
        if (!category) {
            return res.status(404).send({
                error: true,
                msg: "Category not found"
            })
        }
        !!body.name && (category.name = body.name)
        !!body.parent && (category.parent = body.parent)
        await category.save()
        return res.status(200).send({
            error: false,
            msg: "Category updated successfully",
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}


export const delCategory = async (req, res) => {
    try {
        let {user} = res.locals
        let {uid} = req.params
        await Category.findOneAndDelete({user: user?._id, uid})
        return res.status(200).send({
            error: false,
            msg: "Category deleted successfully.",
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}