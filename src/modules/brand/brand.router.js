import { fileUpload, fileValidation } from "../../utils/multer.js";
import { Router } from "express";
import { createBrand } from "./controller/create.brand.js";
import { updateBrand } from "./controller/update.brand.js";
import { getBrands } from "./controller/get.brands.js";
import { getBrand } from "./controller/get.brand.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import * as validators from "./brand.validation.js";
import { validation } from "../../middleware/validation.js";
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
  fileUpload(fileValidation.image).single('image'),
  validation(validators.create),
  asyncHandler(createBrand)
);
router.put(
  "/:brandId",
  fileUpload(fileValidation.image).single('image'),
  validation(validators.update),
  asyncHandler(updateBrand)
);
router.get(
  "/:brandId",
  validation(validators.getOne),
  asyncHandler(getBrand)
);
router.get(
  "/",
  asyncHandler(getBrands)
);

export default router