import couponModel from "../../../../DB/model/Coupon.model.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { StatusCodes } from "http-status-codes";
/**
 * authorized: All
 * input: couponId || ...
 * output: get one coupon || All
 * Logic: Find one coupon || All ? ✔️: ❎ not found
 */
export const getcoupon = async (req, res, next) => {
  let coupon;
  if (req.params.couponId) {
    coupon = await couponModel.findOne({
      _id: req.params.couponId,
    });
  } else {
    coupon = await couponModel.find();
  }
  if (!coupon) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_NOTFOUND_COUPON,
        StatusCodes.NOT_FOUND
      )
    );
  }
  if (!coupon) {
    return next(
      new ErrorClass(allMessages[req.query.ln].NOT_FOUND, StatusCodes.NOT_FOUND)
    );
  }
  return res.status(StatusCodes.CREATED).json({
    message: allMessages[req.query.ln].SUCCESS_COUPON,
    coupon,
  });
};
