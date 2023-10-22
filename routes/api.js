import {Router} from "express";
import userRoutes from "./api/user.routes.js";

const apiRoutes = Router()



apiRoutes.use("/user", userRoutes);


export default apiRoutes;