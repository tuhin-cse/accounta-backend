import validate from "./validator.middleware.js";
import {body} from "express-validator";

export const postCustomerValidator = validate([
    body('name', "Name is required.").exists().notEmpty().withMessage("Name must not be empty."),
    body('phone', "Phone is required.").exists().notEmpty().withMessage("Phone must not be empty."),
    body('email', "Email is required.").exists().notEmpty().withMessage("Email must not be empty.")
        .isEmail().withMessage("Email is invalid."),
    body('address').optional().isString().withMessage("Address must be a string.")
])

export const patchCustomerValidator = validate([
    body('name').optional().notEmpty().withMessage("Name must not be empty."),
    body('phone').optional().notEmpty().withMessage("Phone must not be empty."),
    body('email').optional().notEmpty().withMessage("Email must not be empty.")
        .isEmail().withMessage("Email is invalid."),
    body('address').optional().isString().withMessage("Address must be a string.")
])