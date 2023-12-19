import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

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
    ln: generalFields.ln.required(),
    brandId: generalFields.id,
    nameAR: joi.string().min(2).max(25),
    nameEN: joi.string().min(2).max(25),
    file: generalFields.file,
  })
  .required();

export const common = joi.object({
  brandId: generalFields.id,
  ln: generalFields.ln.required(),
});

export const getAll = joi.object({
  ln: generalFields.ln.required(),
});
