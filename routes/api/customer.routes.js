import {Router} from "express";
import {
    delCustomer,
    getCustomer,
    getCustomers,
    patchCustomer,
    postCustomer
} from "../../controllers/customer.controller.js";
import {patchCustomerValidator, postCustomerValidator} from "../../middlewares/customer.middleware.js";

const customerRoutes = Router();

customerRoutes.get('/list', getCustomers)
customerRoutes.get('/:uid', getCustomer)
customerRoutes.post('/', postCustomerValidator, postCustomer)
customerRoutes.patch('/:uid', patchCustomerValidator, patchCustomer)
customerRoutes.delete('/:uid', delCustomer)

export default customerRoutes;