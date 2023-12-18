import { Router } from "express";
import { asyncHandler } from "../../utils/errorHandling.js";
import * as validators from "./auth.validation.js";
import { validation } from "../../middleware/validation.js";
import { signup } from "./controller/signup.js";
import { confirm } from "./controller/confirm.js";
import { login } from "./controller/login.js";
import { forget } from "./controller/forget.js";
import { reset } from "./controller/reset.js";
const router = Router();
/**
 * Signup ✔️
 */
router.post(
  "/:role/signup",
  validation(validators.signup),
  asyncHandler(signup)
);
/**
 * Confirm email ✔️
 */
router.patch(
  "/:role/confirm",
  validation(validators.confirm),
  asyncHandler(confirm)
);
/**
 * Login ✔️
 */
router.post("/:role/login", validation(validators.login), asyncHandler(login));
/**
 * Forget password ✔️
 */
router.post(
  "/:role/forget",
  validation(validators.forget),
  asyncHandler(forget)
);
/**
 * Reset password ✔️
 */
router.post("/:role/reset", validation(validators.reset), asyncHandler(reset));

export default router;
