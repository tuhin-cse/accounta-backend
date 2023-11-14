import {Router} from "express";
import {
    delPurchase,
    getPurchase, getPurchaseElements,
    getPurchases,
    patchPurchase,
    postPurchase
} from "../../controllers/purchase.controller.js";
import {patchPurchaseValidator, postPurchaseValidator} from "../../middlewares/purchase.middleware.js";

const purchaseRoutes = Router();

purchaseRoutes.get('/list', getPurchases)
purchaseRoutes.get('/elements', getPurchaseElements)
purchaseRoutes.get('/:uid', getPurchase)
purchaseRoutes.post('/', postPurchaseValidator, postPurchase)
purchaseRoutes.patch('/:uid', patchPurchaseValidator, patchPurchase)
purchaseRoutes.delete('/:uid', delPurchase)


export default purchaseRoutes;