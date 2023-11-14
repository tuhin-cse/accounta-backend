import dotenv from "dotenv"
dotenv.config()
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import Currency from "../models/currency.model.js";
import Account from "../models/account.model.js";
import jwt from "jsonwebtoken";
import {generateUid} from "../utils/uid.js";

let secret = process.env.SECRET

export const userRegister = async (req, res) => {
    try {
        const {body} = req;
        let find = await User?.findOne({email: body.email})
        if (find) {
            return res.status(409).send({
                error: true,
                msg: "Email already exists."
            })
        }
        let uid = await generateUid('U-', User)
        let user = await User.create({
            uid,
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
        })
        let cid = await generateUid('C-', Currency)
        let aid = await generateUid('A-', Account)
        let currency = await Currency.create({
            uid: cid,
            user: user?._id,
            name: 'US Dollar',
            code: 'USD',
            symbol: '$',
            rate: 1,
        })
        await Account.create({
            uid: aid,
            user: user?._id,
            name: 'Cash',
            number: '001',
            currency: currency._id,
            balance: 0,
            type: 'cash',
            default: true,
        })
        let token = jwt.sign({_id: user?._id}, secret, {expiresIn: '1d'})
        return res.status(200).send({
            error: false,
            msg: "User registered successfully.",
            data: {
                token,
            }
        })
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}


export const userLogin = async (req, res) => {
    try {

        const {body} = req;
        let user = await User.findOne({email: body.email})
        if (!user || !bcrypt.compareSync(body.password, user?.password)) {
            return res.status(401).send({
                error: true,
                msg: "Invalid email or password."
            })
        }
        let token = jwt.sign({_id: user?._id}, secret, {expiresIn: '1d'})
        return res.status(200).send({
            error: false,
            msg: "User logged in successfully.",
            data: {
                token,
            }
        })
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}


export const getUser = async (req, res) => {
    try {
        let {user} = res.locals
        let data = await User.findById(user?._id).select('-password')
        return res.status(200).send({
            error: false,
            msg: "User data fetched successfully.",
            data
        })
    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}