import validate from "./validator.middleware.js";
import {body} from "express-validator";

export const postCurrencyValidator = validate([
    body('name', "Name is required.").exists().notEmpty().withMessage("Name must not be empty."),
    body('code', "Code is required.").exists().notEmpty().withMessage("Code must not be empty."),
    body('symbol', "Symbol is required.").exists().notEmpty().withMessage("Symbol must not be empty."),
    body('rate', "Rate is required.").exists().notEmpty().withMessage("Rate must not be empty.")
        .isNumeric().withMessage("Rate must be a number."),
])

export const patchCurrencyValidator = validate([
    body('name').optional().notEmpty().withMessage("Name must not be empty."),
    body('code').optional().notEmpty().withMessage("Code must not be empty."),
    body('symbol').optional().notEmpty().withMessage("Symbol must not be empty."),
    body('rate').optional().notEmpty().withMessage("Rate must not be empty.")
        .isNumeric().withMessage("Rate must be a number."),
])