import validate from "./validator.middleware.js";
import {body} from "express-validator";

export const postProductValidator = validate([
    body('name', "Name is required.").exists().notEmpty().withMessage("Name must not be empty.")
        .isString().withMessage("Name must be a string."),
    body('type', "Type is required.").exists().notEmpty().withMessage("Type must not be empty.")
        .isIn(['product', 'service']).withMessage("Type is invalid."),
    body('category', "Category is required.").exists().notEmpty().withMessage("Category must not be empty.")
        .isMongoId().withMessage("Category is invalid."),
    body('description', "Description is required.").exists().notEmpty().withMessage("Description must not be empty.")
        .isString().withMessage("Description must be a string."),
    body('price', "Price is required.").exists().notEmpty().withMessage("Price must not be empty.")
        .isNumeric().withMessage("Price must be a number."),
    body('cost', "Cost is required.").exists().notEmpty().withMessage("Cost must not be empty.")
        .isNumeric().withMessage("Cost must be a number."),
])

export const patchProductValidator = validate([
    body('name').optional().notEmpty().withMessage("Name must not be empty.")
        .isString().withMessage("Name must be a string."),
    body('type').optional().notEmpty().withMessage("Type must not be empty.")
        .isIn(['product', 'service']).withMessage("Type is invalid."),
    body('category').optional().notEmpty().withMessage("Category must not be empty.")
        .isMongoId().withMessage("Category is invalid."),
    body('description').optional().notEmpty().withMessage("Description must not be empty.")
        .isString().withMessage("Description must be a string."),
    body('price').optional().notEmpty().withMessage("Price must not be empty.")
        .isNumeric().withMessage("Price must be a number."),
    body('cost').optional().notEmpty().withMessage("Cost must not be empty.")
        .isNumeric().withMessage("Cost must be a number."),
])