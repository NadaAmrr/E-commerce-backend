import { StatusCodes } from "http-status-codes";
import { customAlphabet } from "nanoid";
import { getModel } from "../../../utils/common.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { hash } from "../../../utils/HashAndEncrypt.js";

export const reset = async (req, res, next) => {
  const { email, password, code } = req.body;
  const model = getModel(req.params.role);
  const user = await model.findOne({ email });
  if (!user) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].NOT_FOUND_USER,
        StatusCodes.CONFLICT
      )
    );
  }
  if (user.confirmed == false) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].NOT_CONFIRMED,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  const hashpassword = hash({ plaintext: password });
  user.password = hashpassword;
  if (code != user.OTP.code) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].INVALID_OTP,
        StatusCodes.NOT_ACCEPTABLE
      )
    );
  }
  const nanoid = customAlphabet("0123456789", 5);
  const newCode = nanoid(5).toString();
  user.OTP.code = newCode;
  user.OTP.status = "password";
  user.OTP.createdAt = new Date();
  await user.save();
  return res.status(StatusCodes.OK).json({
    message: allMessages[req.query.ln].PASSWORD_UPDATE,
  });
};
