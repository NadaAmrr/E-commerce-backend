import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const signup = joi
  .object({
    firstName: joi.string().min(2).max(25).required(),
    lastName: joi.string().min(2).max(25).required(),
    ln: generalFields.ln.required(),
    email: generalFields.email.required(),
    password: generalFields.password.required(),
    cPassword: generalFields.cPassword.valid(joi.ref("password")).required(),
    phone: joi.string().required(),
    role: generalFields.role.required(),
  })
  .required();

export const confirm = joi
  .object({
    ln: generalFields.ln.required(),
    role: generalFields.role.required(),
    email: generalFields.email.required(),
    code: generalFields.code.required(),
  })
  .required();

export const login = joi
  .object({
    ln: generalFields.ln.required(),
    role: generalFields.role.required(),
    email: generalFields.email.required(),
    password: generalFields.password.required(),
  })
  .required();

export const forget = joi
  .object({
    ln: generalFields.ln.required(),
    role: generalFields.role.required(),
    email: generalFields.email.required(),
  })
  .required();

export const reset = joi
  .object({
    ln: generalFields.ln.required(),
    role: generalFields.role.required(),
    email: generalFields.email.required(),
    code: generalFields.code.required(),
    password: generalFields.password.required(),
    cPassword: generalFields.cPassword.valid(joi.ref("password")).required(),
  })
  .required();
