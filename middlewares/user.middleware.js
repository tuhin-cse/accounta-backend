import {body} from "express-validator";
import validate from "./validator.middleware.js";


export const userRegisterValidator = validate([
    body('name', "Name is required.").exists().notEmpty().withMessage("Name must not be empty."),
    body('email', "Email is required.")
        .exists().notEmpty().withMessage("Email must not be empty.")
        .isEmail().withMessage("Email is invalid."),
    body('password', "Password is required.")
        .exists().notEmpty().withMessage("Password must not be empty.")
        .isLength({min: 6}).withMessage("Password must be at least 6 characters long."),
    body('confirm_password', "Confirm password is required.")
        .exists().notEmpty().withMessage("Confirm password must not be empty.")
        .isLength({min: 6}).withMessage("Confirm password must be at least 6 characters long.")
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Confirm password does not match password');
            }
            return true;
        })
])
export const userLoginValidator = validate([
    body('email', "Email is required.")
        .exists().notEmpty().withMessage("Email must not be empty.")
        .isEmail().withMessage("Email is invalid."),
    body('password', "Password is required.")
        .exists().notEmpty().withMessage("Password must not be empty.")
        .isLength({min: 6}).withMessage("Password must be at least 6 characters long.")
])