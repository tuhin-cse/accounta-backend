import {Router} from "express";
import {
    delCurrency,
    getCurrencies,
    getCurrency,
    patchCurrency,
    postCurrency
} from "../../controllers/currencies.controller.js";
import {patchCurrencyValidator, postCurrencyValidator} from "../../middlewares/currency.middleware.js";

const currencyRoutes = Router();

currencyRoutes.get('/list', getCurrencies)
currencyRoutes.get('/:uid', getCurrency)
currencyRoutes.post('/', postCurrencyValidator, postCurrency)
currencyRoutes.patch('/:uid', patchCurrencyValidator, patchCurrency)
currencyRoutes.delete('/:uid', delCurrency)


export default currencyRoutes;