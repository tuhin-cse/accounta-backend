import {Router} from "express";
import {delProduct, getProduct, getProducts, patchProduct, postProduct} from "../../controllers/product.controller.js";
import {patchProductValidator, postProductValidator} from "../../middlewares/product.middleware.js";

const productRoutes = Router();

productRoutes.get('/list', getProducts)
productRoutes.get('/:uid', getProduct)
productRoutes.post('/', postProductValidator, postProduct)
productRoutes.patch('/:uid', patchProductValidator, patchProduct)
productRoutes.delete('/:uid', delProduct)

export default productRoutes;