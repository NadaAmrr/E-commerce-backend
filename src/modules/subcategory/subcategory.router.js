import { fileUpload, fileValidation } from "../../utils/multer.js";
import { Router } from "express";
import { createSubCategory } from "./controller/create.subcategory.js";
import { updateSubCategory } from "./controller/update.subcategory.js";
// import { getSubcategories } from "./controller/get.subcategories.js";
// import { getsubcategory } from "./controller/get.subcategory.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import * as validators from "./subcategory.validation.js";
import { validation } from "../../middleware/validation.js";
const router = Router({ mergeParams: true });
/**
 * Create
 * Update
 * Search one subcategory
 * Search subcategories
 * delete
 */

router.post(
  "/:categoryId",
  fileUpload(fileValidation.image).single('image'),
  validation(validators.create),
  asyncHandler(createSubCategory)
);
router.put(
  "/",
  fileUpload(fileValidation.image).single('image'),
  validation(validators.update),
  asyncHandler(updateSubCategory)
);
// router.get(
//   "/:subcategoryId",
//   validation(validators.getOne),
//   asyncHandler(getsubcategory)
// );
// router.get("/", asyncHandler(getSubcategories));
export default router