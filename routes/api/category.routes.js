import {Router} from "express";
import {
    delCategory,
    getCategories,
    getCategory,
    getCategoryElements,
    patchCategory,
    postCategory, postCategoryGenerate
} from "../../controllers/category.controller.js";
import {patchCategoryValidator, postCategoryValidator} from "../../middlewares/category.middleware.js";

const categoryRoutes =Router();
categoryRoutes.get('/list', getCategories)
categoryRoutes.get('/elements', getCategoryElements)
categoryRoutes.get('/:uid', getCategory)
categoryRoutes.post('/', postCategoryValidator, postCategory)
categoryRoutes.post('/generate', postCategoryGenerate)
categoryRoutes.patch('/:uid', patchCategoryValidator, patchCategory)
categoryRoutes.delete('/:uid', delCategory)

export default categoryRoutes;