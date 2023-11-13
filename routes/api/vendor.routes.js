import {Router} from "express";
import {delVendor, getVendor, getVendors, patchVendor, postVendor} from "../../controllers/vendor.controller.js";
import {patchVendorValidator, postVendorValidator} from "../../middlewares/vendor.middleware.js";

const vendorRoutes = Router()

vendorRoutes.get('/list', getVendors)
vendorRoutes.get('/:uid', getVendor)
vendorRoutes.post('/', postVendorValidator, postVendor)
vendorRoutes.patch('/:uid', patchVendorValidator, patchVendor)
vendorRoutes.delete('/:uid', delVendor)

export default vendorRoutes;

