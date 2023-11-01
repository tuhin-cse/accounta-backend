import {Router} from "express";
import userRoutes from "./api/user.routes.js";
import accountRoutes from "./api/account.routes.js";
import currencyRoutes from "./api/currency.routes.js";

const apiRoutes = Router()


apiRoutes.use('/account', accountRoutes);
apiRoutes.use('/currency', currencyRoutes);
apiRoutes.use("/user", userRoutes);


export default apiRoutes;