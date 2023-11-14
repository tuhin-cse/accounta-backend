import validate from "./validator.middleware.js";
import {body} from "express-validator";

export const postPurchaseValidator = validate([
    body('date', 'Date is required').exists()
        .notEmpty().withMessage('Date cannot be empty')
        .isISO8601().withMessage('Date must be a valid ISO8601 date'),
    body('vendor', 'Vendor is required').exists()
        .notEmpty().withMessage('Vendor cannot be empty')
        .isMongoId().withMessage('Vendor must be a valid ObjectId'),
    body('products', 'Products is required').exists()
        .notEmpty().withMessage('Products cannot be empty')
        .isArray().withMessage('Products must be an array'),
    body('products.*.product', 'Product is required').exists()
        .notEmpty().withMessage('Product cannot be empty')
        .isMongoId().withMessage('Product must be a valid ObjectId'),
    body('products.*.quantity', 'Quantity is required').exists()
        .notEmpty().withMessage('Quantity cannot be empty')
        .isNumeric().withMessage('Quantity must be a number'),
    body('products.*.cost', 'Cost is required').exists()
        .notEmpty().withMessage('Cost cannot be empty')
        .isNumeric().withMessage('Cost must be a number'),
    body('products.*.subtotal', 'Subtotal is required').exists()
        .notEmpty().withMessage('Subtotal cannot be empty')
        .isNumeric().withMessage('Subtotal must be a number'),
    body('subtotal', 'Subtotal is required').exists()
        .notEmpty().withMessage('Subtotal cannot be empty')
        .isNumeric().withMessage('Subtotal must be a number'),
    body('vat', 'Vat is required').exists()
        .notEmpty().withMessage('Vat cannot be empty')
        .isNumeric().withMessage('Vat must be a number'),
    body('total_vat', 'Total vat is required').exists()
        .notEmpty().withMessage('Total vat cannot be empty')
        .isNumeric().withMessage('Total vat must be a number'),
    body('discount', 'Discount is required').exists()
        .notEmpty().withMessage('Discount cannot be empty')
        .isNumeric().withMessage('Discount must be a number'),
    body('total', 'Total is required').exists()
        .notEmpty().withMessage('Total cannot be empty')
        .isNumeric().withMessage('Total must be a number'),
    body('paid', 'Paid is required').exists()
        .notEmpty().withMessage('Paid cannot be empty')
        .isNumeric().withMessage('Paid must be a number'),
])


export const patchPurchaseValidator = validate([
    body('date').optional().notEmpty().withMessage('Date cannot be empty')
        .isISO8601().withMessage('Date must be a valid ISO8601 date'),
    body('vendor').optional().notEmpty().withMessage('Vendor cannot be empty')
        .isMongoId().withMessage('Vendor must be a valid ObjectId'),
    body('products').optional().notEmpty().withMessage('Products cannot be empty')
        .isArray().withMessage('Products must be an array'),
    body('products.*.product').optional().notEmpty().withMessage('Product cannot be empty')
        .isMongoId().withMessage('Product must be a valid ObjectId'),
    body('products.*.quantity').optional().notEmpty().withMessage('Quantity cannot be empty')
        .isNumeric().withMessage('Quantity must be a number'),
    body('products.*.cost').optional().notEmpty().withMessage('Cost cannot be empty')
        .isNumeric().withMessage('Cost must be a number'),
    body('products.*.subtotal').optional().notEmpty().withMessage('Subtotal cannot be empty')
        .isNumeric().withMessage('Subtotal must be a number'),
    body('subtotal').optional().notEmpty().withMessage('Subtotal cannot be empty')
        .isNumeric().withMessage('Subtotal must be a number'),
    body('vat').optional().notEmpty().withMessage('Vat cannot be empty')
        .isNumeric().withMessage('Vat must be a number'),
    body('total_vat').optional().notEmpty().withMessage('Total vat cannot be empty')
        .isNumeric().withMessage('Total vat must be a number'),
    body('discount').optional().notEmpty().withMessage('Discount cannot be empty')
        .isNumeric().withMessage('Discount must be a number'),
    body('total').optional().notEmpty().withMessage('Total cannot be empty')
        .isNumeric().withMessage('Total must be a number'),
])