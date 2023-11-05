import {Router} from "express";
import {isUser} from "../../middlewares/auth.middleware.js";
import {
    delCategory,
    getCategories,
    getCategory, getCategoryElements,
    patchCategory,
    postCategory
} from "../../controllers/category.controller.js";
import {patchCategoryValidator, postCategoryValidator} from "../../middlewares/category.middleware.js";

const categoryRoutes =Router();
categoryRoutes.get('/list', isUser, getCategories)
categoryRoutes.get('/elements', isUser, getCategoryElements)
categoryRoutes.get('/:uid', isUser, getCategory)
categoryRoutes.post('/', isUser, postCategoryValidator, postCategory)
categoryRoutes.patch('/:uid', isUser, patchCategoryValidator, patchCategory)
categoryRoutes.delete('/:uid', isUser, delCategory)

export default categoryRoutes;