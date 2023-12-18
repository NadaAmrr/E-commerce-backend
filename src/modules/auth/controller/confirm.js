import { StatusCodes } from "http-status-codes";
import { customAlphabet } from "nanoid";
import { getModel } from "../../../utils/common.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { ErrorClass } from "../../../utils/errorClass.js";

export const confirm = async (req, res, next) => {
  const { email, code } = req.body;
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
  if (code != user.OTP.code) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].INVALID_OTP,
        StatusCodes.NOT_ACCEPTABLE
      )
    );
  }
  const nanoid = customAlphabet("0123456789", 5);
  user.OTP.code = nanoid(5).toString();
  user.confirmed = true;
  await user.save();
  return res.status(StatusCodes.OK).json({
    message: allMessages[req.query.ln].SUCCESS,
  });
};
