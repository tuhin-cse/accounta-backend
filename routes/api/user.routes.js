import {Router} from "express";
import {userLoginValidator, userRegisterValidator} from "../../middlewares/user.middleware.js";
import {userLogin, userRegister} from "../../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.post('/registration', userRegisterValidator, userRegister)
userRoutes.post('/login', userLoginValidator, userLogin)

export default userRoutes;