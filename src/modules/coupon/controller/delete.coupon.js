import couponModel from "../../../../DB/model/Coupon.model.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { StatusCodes } from "http-status-codes";
/**
 * authorized: Admin
 * input: couponId
 * output: delete coupon
 * logic: Find coupon and createdBy that admin? ✔️ deleted : ❎
 */
export const deleted = async (req, res, next) => {
  const coupon = await couponModel.findOne({
    _id: req.params.couponId,
    createdBy: req.user._id,
  });
  if (!coupon) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_NOTFOUND_COUPON,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  const deleted = await couponModel.deleteOne({
    _id: req.params.couponId,
    createdBy: req.user._id,
  });
  return res.status(StatusCodes.CREATED).json({
    message: allMessages[req.query.ln].SUCCESS_DELETE_COUPON,
    deleted,
  });
};
