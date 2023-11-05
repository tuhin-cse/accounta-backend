import {Router} from "express";
import {isUser} from "../../middlewares/auth.middleware.js";
import {
    delCurrency,
    getCurrencies,
    getCurrency,
    patchCurrency,
    postCurrency
} from "../../controllers/currencies.controller.js";
import {patchCurrencyValidator, postCurrencyValidator} from "../../middlewares/currency.middleware.js";

const currencyRoutes = Router();

currencyRoutes.get('/list', isUser, getCurrencies)
currencyRoutes.get('/:uid', isUser, getCurrency)
currencyRoutes.post('/', isUser, postCurrencyValidator, postCurrency)
currencyRoutes.patch('/:uid', isUser, patchCurrencyValidator, patchCurrency)
currencyRoutes.delete('/:uid', isUser, delCurrency)


export default currencyRoutes;