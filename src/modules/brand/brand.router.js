import { fileUpload, fileValidation } from "../../utils/multer.js";
import { Router } from "express";
import { createBrand } from "./controller/create.brand.js";
import { updateBrand } from "./controller/update.brand.js";
// import { getBrands } from "./controller/get.brands.js";
// import { getBrand } from "./controller/get.brand.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import * as validators from "./brand.validation.js";
import { validation } from "../../middleware/validation.js";
import { Roles, auth } from "../../middleware/auth.js";
import { getBrand } from "./controller/get.brands.js";
import { deleted } from "./controller/delete.brand.js";
const router = Router();
/**
 * Create
 * Update
 * Search one brand
 * Search brands
 * delete
 */

router.post(
  "/",
  fileUpload(fileValidation.image).single("image"),
  validation(validators.create),
  auth([Roles.admin]),
  asyncHandler(createBrand)
);
router.put(
  "/:brandId",
  fileUpload(fileValidation.image).single("image"),
  validation(validators.update),
  auth([Roles.admin]),
  asyncHandler(updateBrand)
);
router.get(
  "/:brandId",
  validation(validators.common),
  auth(Object.values(Roles)),
  asyncHandler(getBrand)
);
router.get(
  "/",
  validation(validators.getAll),
  auth(Object.values(Roles)),
  asyncHandler(getBrand)
);
router.delete(
  "/:brandId",
  validation(validators.common),
  auth([Roles.admin]),
  asyncHandler(deleted)
);
export default router;
