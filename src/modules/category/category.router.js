import subcategory from "../subcategory/subcategory.router.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import { Router } from "express";
import { createCategory } from "./controller/create.category.js";
import { updateCategory } from "./controller/update.category.js";
import { getCategories } from "./controller/get.categories.js";
import { getCategory } from "./controller/get.category.js";
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

router.use("/:categoryId/:subcategoryId",  subcategory )
router.post(
  "/",
  fileUpload(fileValidation.image).single('image'),
  validation(validators.create),
  asyncHandler(createCategory)
);
router.put(
  "/:categoryId",
  fileUpload(fileValidation.image).single('image'),
  validation(validators.update),
  asyncHandler(updateCategory)
);
router.get(
  "/:categoryId",
  validation(validators.getOne),
  asyncHandler(getCategory)
);
router.get(
  "/",
  asyncHandler(getCategories)
);

export default router