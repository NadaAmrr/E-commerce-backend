import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const create = joi
  .object({
    nameAR: joi.string().min(2).max(20).required(),
    nameEN: joi.string().min(2).max(20).required(),
    file: generalFields.file.required(),
    // file: joi.array().items(generalFields.file.required()).required(),
    // authorization: joi.object().string().required()
  })
  .required();

export const update = joi
  .object({
    categoryId: generalFields.id,
    nameAR: joi.string().min(2).max(20),
    nameEN: joi.string().min(2).max(20),
    file: generalFields.file,
  })
  .required();

  export const getOne = joi.object({
    categoryId: generalFields.id,
  })
