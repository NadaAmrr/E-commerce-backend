import { fileUpload, fileValidation } from "../../utils/multer.js";
import { Router } from "express";
import { createSubCategory } from "./controller/create.subcategory.js";
import { updateSubCategory } from "./controller/update.subcategory.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import * as validators from "./subcategory.validation.js";
import { validation } from "../../middleware/validation.js";
import { Roles, auth } from "../../middleware/auth.js";
import { deleted } from "./controller/delete.subcategory.js";
import { getSubCategory } from "./controller/get.subcategory.js";
import { getSubCategories } from "./controller/get.subcategories.js";
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
  fileUpload(fileValidation.image).single("image"),
  validation(validators.create),
  auth([Roles.admin]),
  asyncHandler(createSubCategory)
);
router.put(
  "/",
  fileUpload(fileValidation.image).single("image"),
  validation(validators.update),
  auth([Roles.admin]),
  asyncHandler(updateSubCategory)
);
router.delete(
  "/:subcategoryId",
  validation(validators.common),
  auth([Roles.admin]),
  asyncHandler(deleted)
);
router.get(
  "/:subcategoryId",
  validation(validators.common),
  auth(Object.values(Roles)),
  asyncHandler(getSubCategory)
);
router.get(
  "/",
  validation(validators.getAll),
  auth(Object.values(Roles)),
  asyncHandler(getSubCategories)
);
export default router;
