import validate from "./validator.middleware.js";
import {body} from "express-validator";

export const postAccountValidator = validate([
    body('name', "Name is required.").exists().notEmpty().withMessage("Name must not be empty."),
    body('type', "Type is required.").exists().notEmpty().withMessage("Type must not be empty.")
        .isIn(['bank', 'cash', 'card', 'investment', 'loan', 'other']).withMessage("Type is invalid."),
    body('currency', "Currency is required.").exists().notEmpty().withMessage("Currency must not be empty.")
        .isMongoId().withMessage("Currency is invalid."),
    body('number', "Number is required.").exists().notEmpty().withMessage("Number must not be empty."),
    body('initial_balance', "Initial balance is required.").exists().notEmpty().withMessage("Initial balance must not be empty.")
        .isNumeric().withMessage("Initial balance must be a number."),
    body('default', "Default is required.").exists().notEmpty().withMessage("Default must not be empty.")
        .isBoolean().withMessage("Default must be a boolean."),
])


export const patchAccountValidator = validate([
    body('name').optional().notEmpty().withMessage("Name must not be empty."),
    body('type').optional().notEmpty().withMessage("Type must not be empty.")
        .isIn(['bank', 'cash', 'card', 'investment', 'loan', 'other']).withMessage("Type is invalid."),
    body('currency').optional().notEmpty().withMessage("Currency must not be empty.")
        .isMongoId().withMessage("Currency is invalid."),
    body('number').optional().notEmpty().withMessage("Number must not be empty."),
    body('initial_balance').optional().notEmpty().withMessage("Initial balance must not be empty.")
        .isNumeric().withMessage("Initial balance must be a number."),
    body('default').optional().notEmpty().withMessage("Default must not be empty.")
        .isBoolean().withMessage("Default must be a boolean."),
])