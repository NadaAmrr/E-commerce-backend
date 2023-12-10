import joi from "joi";
import { generalFields } from "../../middleware/validation.js";
/**
 * Create category => create
 * Update category => update
 *
 */
export const create = joi
  .object({
    nameEN: joi.string().min(2).max(25).required(),
    nameAR: joi.string().min(2).max(25).required(),
    descriptionEN: joi.string().min(2).max(50),
    descriptionAR: joi.string().min(2).max(50),
    ln: generalFields.ln.required(),
    file: generalFields.file.required(),
  })
  .required();

export const update = joi
  .object({
    categoryId: generalFields.id,
    nameAR: joi.string().min(2).max(25),
    nameEN: joi.string().min(2).max(25),
    file: generalFields.file,
  })
  .required();

export const getOne = joi.object({
  categoryId: generalFields.id,
});
