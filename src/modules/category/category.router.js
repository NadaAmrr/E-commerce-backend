import subcategory from "../subcategory/subcategory.router.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import { Router } from "express";
import { createCategory } from "./controller/create.category.js";
import { updateCategory } from "./controller/update.category.js";
import { getCategories } from "./controller/get.categories.js";
import { getCategory } from "./controller/get.category.js";
import { deleted } from "./controller/delete.category.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import * as validators from "./category.validation.js";
import { validation } from "../../middleware/validation.js";
import { Roles, auth } from "../../middleware/auth.js";
const router = Router();
/**
 * Create ✔️
 * Update ✔️
 * Search one category ✔️
 * Search categories ✔️
 * delete ✔️
 */

router.use("/:categoryId/:subcategoryId", subcategory);
router.post(
  "/",
  fileUpload(fileValidation.image).single("image"),
  validation(validators.create),
  auth([Roles.admin]),
  asyncHandler(createCategory)
);
router.put(
  "/:categoryId",
  fileUpload(fileValidation.image).single("image"),
  validation(validators.update),
  auth([Roles.admin]),
  asyncHandler(updateCategory)
);
router.get(
  "/:categoryId",
  validation(validators.common),
  auth(Object.values(Roles)),
  asyncHandler(getCategory)
);
router.get(
  "/",
  validation(validators.getAll),
  auth(Object.values(Roles)),
  asyncHandler(getCategories)
);
router.delete(
  "/:categoryId",
  validation(validators.common),
  auth([Roles.admin]),
  asyncHandler(deleted)
);

export default router;
