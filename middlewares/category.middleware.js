import validate from "./validator.middleware.js";
import {body} from "express-validator";

export const postCategoryValidator = validate([
    body('name', "Name is required.").exists().notEmpty().withMessage("Name must not be empty.").isString().withMessage("Name must be a string."),
    body('parent', "Parent is required.").optional().notEmpty().withMessage("Parent must not be empty.").isMongoId().withMessage("Parent must be a valid ObjectId."),
])

export const patchCategoryValidator = validate([
    body('name', "Name is required.").optional().notEmpty().withMessage("Name must not be empty.").isString().withMessage("Name must be a string."),
    body('parent', "Parent is required.").optional().notEmpty().withMessage("Parent must not be empty.").isMongoId().withMessage("Parent must be a valid ObjectId."),
])