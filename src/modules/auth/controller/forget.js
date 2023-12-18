import { StatusCodes } from "http-status-codes";
import { customAlphabet } from "nanoid";
import { getModel } from "../../../utils/common.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import sendEmail from "../../../utils/email.js";
import { createHtml } from "../../../utils/emailHTML.js";

export const forget = async (req, res, next) => {
  const { email } = req.body;
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
  const nanoid = customAlphabet("0123456789", 5);
  const code = nanoid(5).toString();
  const sent = await sendEmail({
    to: email,
    subject: "Confirmation E-Mail",
    html: createHtml(`This Code to change password`, code),
  });
  if (!sent) {
    return {
      error: new ErrorClass(
        allMessages[req.query.ln].FAIL_SEND_EMAIL,
        StatusCodes.BAD_REQUEST
      ),
    };
  }
  user.OTP.code = code;
  user.OTP.status = "password";
  user.OTP.createdAt = new Date();
  await user.save();
  return res.status(StatusCodes.OK).json({
    message: allMessages[req.query.ln].CHECK_EMAIL_PASS,
  });
};
