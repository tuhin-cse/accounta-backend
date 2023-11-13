import {Router} from "express";
import {
    delAccount,
    getAccount,
    getAccountElements,
    getAccounts,
    patchAccount,
    postAccount
} from "../../controllers/account.controller.js";
import {patchAccountValidator, postAccountValidator} from "../../middlewares/account.middleware.js";

const accountRoutes = Router();

accountRoutes.get('/list', getAccounts)
accountRoutes.get('/elements', getAccountElements)
accountRoutes.get('/:uid', getAccount)
accountRoutes.post('/', postAccountValidator, postAccount)
accountRoutes.patch('/:uid', patchAccountValidator, patchAccount)
accountRoutes.delete('/:uid', delAccount)

export default accountRoutes;