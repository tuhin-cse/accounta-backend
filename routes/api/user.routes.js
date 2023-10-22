import {Router} from "express";
import {userLoginValidator} from "../../middlewares/user.middleware.js";
import {userLogin} from "../../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.post('/login', userLoginValidator, userLogin)

export default userRoutes;