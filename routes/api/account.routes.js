import {Router} from "express";
import {isUser} from "../../middlewares/auth.middleware.js";
import {delAccount, getAccount, getAccounts, patchAccount, postAccount} from "../../controllers/account.controller.js";
import {postAccountValidator} from "../../middlewares/account.middleware.js";

const accountRoutes = Router();

accountRoutes.get('/list', isUser, getAccounts)
accountRoutes.get('/:uid', isUser, getAccount)
accountRoutes.post('/', isUser, postAccountValidator, postAccount)
accountRoutes.patch('/:uid', isUser, patchAccount)
accountRoutes.delete('/:uid', isUser, delAccount)

export default accountRoutes;