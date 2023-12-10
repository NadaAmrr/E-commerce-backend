import cloudinary from "../../../utils/cloudinary.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { StatusCodes } from "http-status-codes";
import couponModel from "../../../../DB/model/Coupon.model.js";
/**
 * authorized: Admin
 * input:
 * output: update coupon
 * logic:
 */
export const updateCoupon = async (req, res, next) => {
  const coupon = await couponModel.findOne({ createdBy: req.user._id });
  // update if not any one use this coupon
  if (coupon.usedBy != []) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_TOUPDATE_COUPON,
        StatusCodes.CONFLICT
      )
    );
  }
  const couponOther = await couponModel.findOne({
    name: req.body.name,
    createdBy: { $ne: req.user._id },
  });
  if (couponOther) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_EXIST_COUPON,
        StatusCodes.CONFLICT
      )
    );
  }
  if (req.body.name) {
    coupon.name = req.body.name;
  }
  if (req.body.amount) {
    coupon.amount = req.body.amount;
  }
  if (req.file) {
    if (coupon.image) {
      await cloudinary.uploader.destroy(
        category.image.public_id,
        (error, result) => {
          if (error) {
            console.error(error);
          } else {
            console.log(result);
          }
        }
      );
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `${process.env.APP_NAME}/coupon` },
      (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log(result);
        }
      }
    );
    coupon.image = { secure_url, public_id };
  }
  await coupon.save();
  if (!coupon) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_UPDATE_COUPON,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  return res.status(StatusCodes.OK).json({
    message: allMessages[req.query.ln].SUCCESS_UPDATE_COUPON,
    coupon,
  });
};
