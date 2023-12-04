import joi from "joi";
import { Types } from "mongoose";

const validateObjectId = (value, helper) => {
  console.log({ value });
  console.log({ helper });
  return Types.ObjectId.isValid(value)
    ? true
    : helper.message("In-valid objectId");
};
export const generalFields = {
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 4,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: joi
    .string()
    .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
    .required(),
  cPassword: joi.string().required(),
  id: joi.string().custom(validateObjectId).required(),
  file: joi.object({
    size: joi.number().positive().required(),
    path: joi.string().required(),
    filename: joi.string().required(),
    destination: joi.string().required(),
    mimetype: joi.string().required(),
    encoding: joi.string().required(),
    originalname: joi.string().required(),
    fieldname: joi.string().required(),
  }),
};

export const validation = (schema) => {
  return (req, res, next) => {
    const inputData = { ...req.body, ...req.query, ...req.params };
    if (req.file || req.files) {
      inputData.file = req.file || req.files;
    }
    console.log({ inputData });
    const result = schema.validate(inputData, { abortEarly: false });
    if (result.error?.details) {
      return res.status(400).json({
        message: "Validation Error",
        validationError: result.error?.details,
      });
    }
    return next();
  };
};
