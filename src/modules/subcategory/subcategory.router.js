import { fileUpload, fileValidation } from "../../utils/multer.js";
import { Router } from "express";
import { createSubategory } from "./controller/create.subcategory.js";
import { updateSubcategory } from "./controller/update.subcategory.js";
import { getSubcategories } from "./controller/get.subcategories.js";
import { getsubcategory } from "./controller/get.subcategory.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import * as validators from "./category.validation.js";
import { validation } from "../../middleware/validation.js";
const router = Router();
/**
 * Create ✔️
 * Update ✔️
 * Search one category ✔️
 * Search categories ✔️
 * delete
 */

router.post(
  "/",
  fileUpload(fileValidation.image).single(image),
  validation(validators.create),
  asyncHandler(createSubategory)
);
router.patch(
  "/:categoryId",
  fileUpload(fileValidation.image).single(image),
  validation(validators.update),
  asyncHandler(updateSubcategory)
);
router.get(
  "/:categoryId",
  validation(validators.getOne),
  asyncHandler(getsubcategory)
);
router.get(
  "/",
  asyncHandler(getSubcategories)
);