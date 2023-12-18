import { StatusCodes } from "http-status-codes";
import { compare } from "../../../utils/HashAndEncrypt.js";
import { generateToken } from "../../../utils/generateAndVerifyToken.js";
import { getModel } from "../../../utils/common.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { allMessages } from "../../../utils/localizationHelper.js";
/**
 * authorized: Admin - doctor - patient
 * Logic: check if email found before ? ✔️: ❎ --> Check if email is confirmed --> compare password and hash password in DB --> Generate access token valid ( 2 m )
 * input: email - password
 * output: accessToken
 */
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const model = getModel(req.params.role);
  const user = await model.findOne({ email });
  if (!user) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].NOT_FOUND_USER,
        StatusCodes.NOT_FOUND
      )
    );
  }
  if (!user.confirmed) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].NOT_CONFIRMED,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  const match = compare({ plaintext: password, hashValue: user.password });
  if (!match) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].INVALID_INFO,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  const accessToken = generateToken({
    payload: { id: user._id, email: user.email, role: req.params.role },
    expiresIn: 60 * 60 * 24 * 30 * 2,
  });
  user.status = "online";
  await user.save();
  return res
    .status(StatusCodes.OK)
    .json({ message: allMessages[req.query.ln].SUCCESS, accessToken });
};
