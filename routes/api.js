import {Router} from "express";
import userRoutes from "./api/user.routes.js";
import accountRoutes from "./api/account.routes.js";
import currencyRoutes from "./api/currency.routes.js";
import categoryRoutes from "./api/category.routes.js";
import productRoutes from "./api/product.routes.js";
import customerRoutes from "./api/customer.routes.js";
import {isUser} from "../middlewares/auth.middleware.js";
import vendorRoutes from "./api/vendor.routes.js";
import saleRoutes from "./api/sale.routes.js";
import purchaseRoutes from "./api/purchase.routes.js";

const apiRoutes = Router()


apiRoutes.use('/account', isUser, accountRoutes);
apiRoutes.use('/category', isUser, categoryRoutes);
apiRoutes.use('/currency', isUser, currencyRoutes);
apiRoutes.use('/customer', isUser, customerRoutes);
apiRoutes.use('/product', isUser, productRoutes);
apiRoutes.use('/purchase', isUser, purchaseRoutes);
apiRoutes.use('/sale', isUser, saleRoutes);
apiRoutes.use('/vendor', isUser, vendorRoutes);

apiRoutes.use("/user", userRoutes);


export default apiRoutes;