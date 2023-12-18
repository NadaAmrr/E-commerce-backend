import { hash } from "../../../utils/HashAndEncrypt.js";
import { StatusCodes } from "http-status-codes";
import { customAlphabet } from "nanoid";
import { getModel } from "../../../utils/common.js";
import sendEmail from "../../../utils/email.js";
import { createHtml } from "../../../utils/emailHTML.js";
import crypto from "crypto-js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { ErrorClass } from "../../../utils/errorClass.js";
export const signup = async (req, res, next) => {
  const model = getModel(req.params.role);
  const { firstName, lastName, email, password } = req.body;
  if (await model.findOne({ email })) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].EMAIL_EXIST,
        StatusCodes.CONFLICT
      )
    );
  }
  /**
   * generate OTP
   * Send a confirmation email to a user to confirm their email address
   */
  const nanoid = customAlphabet("0123456789", 5);
  const code = nanoid(5).toString();
  const sent = await sendEmail({
    to: email,
    subject: "Confirmation E-Mail",
    html: createHtml(`This Code to confirm your email`, code),
  });
  if (!sent) {
    return {
      error: new ErrorClass(
        allMessages[req.query.ln].FAIL_SEND_EMAIL,
        StatusCodes.BAD_REQUEST
      ),
    };
  }
  // Hash password
  const hashpassword = hash({ plaintext: password });
  // Encrpt phone
  const phone = crypto.AES.encrypt(
    req.body.phone,
    process.env.ENCRPT_PHONE
  ).toString();
  const { _id } = await model.create({
    firstName,
    lastName,
    email,
    password: hashpassword,
    phone,
    OTP: {
      code,
      status: "confirm",
      createdAt: new Date(),
    },
  });
  return res.status(StatusCodes.OK).json({
    message: allMessages[req.query.ln].CHECK_EMAIL,
    _id,
  });
};
