import {Router} from "express";
import {isUser} from "../../middlewares/auth.middleware.js";
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

accountRoutes.get('/list', isUser, getAccounts)
accountRoutes.get('/elements', isUser, getAccountElements)
accountRoutes.get('/:uid', isUser, getAccount)
accountRoutes.post('/', isUser, postAccountValidator, postAccount)
accountRoutes.patch('/:uid', isUser, patchAccountValidator, patchAccount)
accountRoutes.delete('/:uid', isUser, delAccount)

export default accountRoutes;