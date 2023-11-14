import {Router} from "express";
import {delSale, getSale, getSaleElements, getSales, patchSale, postSale} from "../../controllers/sale.controller.js";
import {patchSaleValidator, postSaleValidator} from "../../middlewares/sale.middleware.js";

const saleRoutes = Router();

saleRoutes.get('/list', getSales)
saleRoutes.get('/elements', getSaleElements)
saleRoutes.get('/:uid', getSale)
saleRoutes.post('/', postSaleValidator, postSale)
saleRoutes.patch('/:uid', patchSaleValidator, patchSale)
saleRoutes.delete('/:uid', delSale)

export default saleRoutes;