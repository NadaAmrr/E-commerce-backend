import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../utils/errorHandling.js";
import { allMessages } from "../utils/localizationHelper.js";
import customerModel from "../../DB/model/Customer.model.js";
import adminModel from "../../DB/model/Admin.model.js";
import { ErrorClass } from "../utils/errorClass.js";

export const Roles = {
  admin: "admin",
  customer: "customer",
};
Object.freeze(Roles);
export const auth = (roles = []) => {
  return asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;
    console.log({ authorization });
    if (!authorization) {
      return next(
        new ErrorClass(
          allMessages[req.query.ln].TOKEN_NOT_EXIST,
          StatusCodes.BAD_REQUEST
        )
      );
    }
    if (!authorization?.startsWith(process.env.BEARER_KEY)) {
      return next(
        new ErrorClass(
          allMessages[req.query.ln].BEARER_KEY,
          StatusCodes.BAD_REQUEST
        )
      );
    }

    const token = authorization.split(process.env.BEARER_KEY)[1];
    console.log({ token });
    if (!token) {
      return next(
        new ErrorClass(
          allMessages[req.query.ln].TOKEN_NOT_EXIST,
          StatusCodes.BAD_REQUEST
        )
      );
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE);
    console.log({ decoded });
    if (!decoded?.id) {
      return next(
        new ErrorClass(
          allMessages[req.query.ln].INVALID_PAYLOAD,
          StatusCodes.BAD_REQUEST
        )
      );
    }

    let user, userRole;
    if (decoded.role == Roles.customer) {
      user = await customerModel.findById(decoded.id);
      userRole = Roles.customer;
    }
    if (decoded.role == Roles.admin) {
      console.log("here");
      user = await adminModel.findById(decoded.id);
      userRole = Roles.admin;
    }
    if (!user) {
      return next(
        new ErrorClass(
          allMessages[req.query.ln].NOT_FOUND_USER,
          StatusCodes.NOT_FOUND
        )
      );
    }
    if (!roles.includes(decoded.role)) {
      return next(
        new ErrorClass(
          allMessages[req.query.ln].UNAUTHORIZED,
          StatusCodes.FORBIDDEN
        )
      );
    }
    if (user.status == false) {
      return next(
        new ErrorClass(
          allMessages[req.query.ln].LOGIN_FIRST,
          StatusCodes.UNAUTHORIZED
        )
      );
    }
    req.user = user;
    req.userRole = userRole;
    return next();
  });
};
