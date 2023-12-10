import joi from "joi";
import { generalFields } from "../../middleware/validation.js";
/**
 * Create coupon => create
 * Update coupon => update
 *
 */
export const create = joi
  .object({
    name: joi.string().min(2).max(25).required(),
    amount: joi.number().positive().min(1).max(100).required(),
    expireDate: joi.string(),
    ln: generalFields.ln.required(),
    file: generalFields.file.required(),
  })
  .required();

  export const update = joi
  .object({
    name: joi.string().min(2).max(25),
    amount: joi.number().positive().min(1).max(100),
    expireDate: joi.string(),
    ln: generalFields.ln.required(),
    file: generalFields.file,
  })
  .required();

export const getOne = joi.object({
  categoryId: generalFields.id,
});