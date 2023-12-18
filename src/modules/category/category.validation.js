import joi from "joi";
import { generalFields } from "../../middleware/validation.js";
/**
 * Create category => create
 * Update category => update
 *
 */
export const create = joi
  .object({
    ln: generalFields.ln.required(),
    nameEN: joi.string().min(2).max(25).required(),
    nameAR: joi.string().min(2).max(25).required(),
    descriptionEN: joi.string().min(2).max(50),
    descriptionAR: joi.string().min(2).max(50),
    file: generalFields.file.required(),
  })
  .required();

export const update = joi
  .object({
    ln: generalFields.ln.required(),
    categoryId: generalFields.id,
    nameAR: joi.string().min(2).max(25),
    nameEN: joi.string().min(2).max(25),
    file: generalFields.file,
  })
  .required();

export const common = joi.object({
  categoryId: generalFields.id,
  ln: generalFields.ln.required(),
});

export const getAll = joi.object({
  ln: generalFields.ln.required(),
});
