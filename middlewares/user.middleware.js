import {body} from "express-validator";
import validate from "./validator.middleware.js";

export const userLoginValidator = validate([
    body('email', "Email is required.")
        .exists().notEmpty().withMessage("Email must not be empty.")
        .isEmail().withMessage("Email is invalid."),
    body('password', "Password is required.")
        .exists().notEmpty().withMessage("Password must not be empty.")
        .isLength({min: 6}).withMessage("Password must be at least 6 characters long.")
])