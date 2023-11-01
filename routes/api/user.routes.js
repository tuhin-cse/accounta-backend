import {Router} from "express";
import {userLoginValidator, userRegisterValidator} from "../../middlewares/user.middleware.js";
import {getUser, userLogin, userRegister} from "../../controllers/user.controller.js";
import {isUser} from "../../middlewares/auth.middleware.js";

const userRoutes = Router();

userRoutes.post('/register', userRegisterValidator, userRegister)
userRoutes.post('/login', userLoginValidator, userLogin)
userRoutes.get('/', isUser, getUser)

export default userRoutes;