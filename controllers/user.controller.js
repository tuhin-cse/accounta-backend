import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import Currency from "../models/currency.model.js";
import Account from "../models/account.model.js";
import jwt from "jsonwebtoken";

let secret = process.env.SECRET_KEY

export const userRegister = async (req, res) => {
    try {
        const {body} = req;
        let user = await User.create({
            ...body,
            password: bcrypt.hashSync(body.password, 10),
        })
        let currency = await Currency.create({
            user: user._id,
            currency: 'US Dollar',
            code: 'USD',
            symbol: '$',
            rate: 1,
        })
        await Account.create({
            user: user._id,
            name: 'Cash',
            number: '001',
            currency: currency._id,
            balance: 0,
            type: 'cash',
        })
        let token = jwt.sign({_id: user._id}, secret, {expiresIn: '1d'})
        return res.status(200).send({
            error: false,
            msg: "User registered successfully.",
            data: {
                token,
            }
        })
    } catch (e) {
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
        return res.status(500).send({
            error: true,
            msg: "Something went wrong."
        })
    }
}