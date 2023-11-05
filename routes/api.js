import {Router} from "express";
import userRoutes from "./api/user.routes.js";
import accountRoutes from "./api/account.routes.js";
import currencyRoutes from "./api/currency.routes.js";
import categoryRoutes from "./api/category.routes.js";
import productRoutes from "./api/product.routes.js";

const apiRoutes = Router()


apiRoutes.use('/account', accountRoutes);
apiRoutes.use('/category', categoryRoutes);
apiRoutes.use('/currency', currencyRoutes);
apiRoutes.use('/product', productRoutes);
apiRoutes.use("/user", userRoutes);


export default apiRoutes;