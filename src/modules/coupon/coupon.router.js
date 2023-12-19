import { fileUpload, fileValidation } from "../../utils/multer.js";
import { Router } from "express";
import { createCoupon } from "./controller/create.coupon.js";
import { updateCoupon } from "./controller/update.coupon.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import * as validators from "./coupon.validation.js";
import { validation } from "../../middleware/validation.js";
import { Roles, auth } from "../../middleware/auth.js";
import { deleted } from "./controller/delete.coupon.js";
import { getcoupon } from "./controller/get.coupons.js";
const router = Router();
/**
 * Create
 * Update
 * Search one coupon
 * Search coupons
 * delete
 */
router.post(
  "/",
  fileUpload(fileValidation.image).single("image"),
  validation(validators.create),
  auth([Roles.admin]),
  asyncHandler(createCoupon)
);
router.put(
  "/:couponId",
  fileUpload(fileValidation.image).single("image"),
  validation(validators.update),
  auth([Roles.admin]),
  asyncHandler(updateCoupon)
);
router.delete(
  "/:couponId",
  validation(validators.common),
  auth([Roles.admin]),
  asyncHandler(deleted)
);
router.get(
  "/:couponId",
  validation(validators.common),
  auth(Object.values(Roles)),
  asyncHandler(getcoupon)
);
router.get(
  "/",
  validation(validators.getAll),
  auth(Object.values(Roles)),
  asyncHandler(getcoupon)
);

export default router;
