import joi from "joi";
import { generalFields } from "../../middleware/validation.js";
/**
 * Create brand => create
 * Update brand => update
 *
 */
export const create = joi
  .object({
    nameEN: joi.string().min(2).max(25).required(),
    nameAR: joi.string().min(2).max(25).required(),
    ln: generalFields.ln.required(),
    file: generalFields.file.required(),
  })
  .required();

export const update = joi
  .object({
    brandId: generalFields.id,
    nameAR: joi.string().min(2).max(25),
    nameEN: joi.string().min(2).max(25),
    file: generalFields.file,
  })
  .required();

export const getOne = joi.object({
  brandId: generalFields.id,
});
