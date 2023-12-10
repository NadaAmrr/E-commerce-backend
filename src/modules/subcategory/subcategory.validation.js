import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const create = joi
  .object({
    categoryId: generalFields.id,
    nameAR: joi.string().min(2).max(20).required(),
    nameEN: joi.string().min(2).max(20).required(),
    descriptionEN: joi.string().min(2).max(50),
    descriptionAR: joi.string().min(2).max(50),
    ln: generalFields.ln.required(),
    file: generalFields.file.required(),
  })
  .required();

export const update = joi
  .object({
    categoryId: generalFields.id,
    subcategoryId: generalFields.id,
    nameAR: joi.string().min(2).max(20),
    nameEN: joi.string().min(2).max(20),
    descriptionEN: joi.string().min(2).max(50),
    descriptionAR: joi.string().min(2).max(50),
    ln: generalFields.ln.required(),
    file: generalFields.file,
  })
  .required();

export const getOne = joi.object({
  subcategoryId: generalFields.id,
});
