import validate from "./validator.middleware.js";
import {body} from "express-validator";

export const postVendorValidator = validate([
    body('name', "Name is required.").exists().notEmpty().withMessage("Name must not be empty."),
    body('phone', "Phone is required.").exists().notEmpty().withMessage("Phone must not be empty."),
    body('email', "Email is required.").exists().notEmpty().withMessage("Email must not be empty.")
        .isEmail().withMessage("Email is invalid."),
    body('address').optional().isString().withMessage("Address must be a string."),
    body('business', "Business name is required.").exists().notEmpty().withMessage("Business name must not be empty."),
])

export const patchVendorValidator = validate([
    body('name').optional().notEmpty().withMessage("Name must not be empty."),
    body('phone').optional().notEmpty().withMessage("Phone must not be empty."),
    body('email').optional().notEmpty().withMessage("Email must not be empty.")
        .isEmail().withMessage("Email is invalid."),
    body('address').optional().isString().withMessage("Address must be a string."),
    body('business').optional().notEmpty().withMessage("Business name must not be empty."),
])