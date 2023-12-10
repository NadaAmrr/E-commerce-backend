import { fileUpload, fileValidation } from "../../utils/multer.js";
import { Router } from "express";
import { createCoupon } from "./controller/create.coupon.js";
import { updateCoupon } from "./controller/update.coupon.js";
import { updateCoupon } from "./controller/update.coupon.js";
import { getCoupon } from "./controller/get.coupon.js";
import { getCoupons } from "./controller/get.coupons.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import * as validators from "./coupon.validation.js";
import { validation } from "../../middleware/validation.js";
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
  fileUpload(fileValidation.image).single('image'),
  validation(validators.create),
  asyncHandler(createCoupon)
);
router.put(
  "/:couponId",
  fileUpload(fileValidation.image).single('image'),
  validation(validators.update),
  asyncHandler(updateCoupon)
);
router.get(
  "/:couponId",
  validation(validators.getOne),
  asyncHandler(getCoupon)
);
router.get(
  "/",
  asyncHandler(getCoupons)
);

export default router