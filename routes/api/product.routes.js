import {Router} from "express";
import {isUser} from "../../middlewares/auth.middleware.js";
import {delProduct, getProduct, getProducts, patchProduct, postProduct} from "../../controllers/product.controller.js";
import {patchProductValidator, postProductValidator} from "../../middlewares/product.middleware.js";

const productRoutes = Router();

productRoutes.get('/list', isUser, getProducts)
productRoutes.get('/:uid', isUser, getProduct)
productRoutes.post('/', isUser, postProductValidator, postProduct)
productRoutes.patch('/:uid', isUser, patchProductValidator, patchProduct)
productRoutes.delete('/:uid', isUser, delProduct)

export default productRoutes;