import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

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
    couponId: generalFields.id,
  })
  .required();

export const common = joi.object({
  couponId: generalFields.id,
  ln: generalFields.ln.required(),
});

export const getAll = joi.object({
  ln: generalFields.ln.required(),
});
