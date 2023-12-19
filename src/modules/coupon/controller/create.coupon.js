import cloudinary from "../../../utils/cloudinary.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { StatusCodes } from "http-status-codes";
import couponModel from "../../../../DB/model/Coupon.model.js";
/**
 * authorized: Admin
 * input: image? - amount - expireDate
 * output: create coupon
 * logic:
 */
export const createCoupon = async (req, res, next) => {
  // Check if other coupons have same name
  if (await couponModel.findOne({ name: req.body.name })) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_EXIST_COUPON,
        StatusCodes.CONFLICT
      )
    );
  }
  // Check if admin add Image  ( image? )
  if (req.file) {
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
    req.body.image = { secure_url, public_id };
  }
  const coupon = await couponModel.create({
    name: req.body.name,
    image: req.body.image,
    createdBy: req.user._id,
  });
  if (!coupon) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_CREATE_COUPON,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  return res.status(StatusCodes.CREATED).json({
    message: allMessages[req.query.ln].SUCCESS_CREATE_COUPON,
    coupon,
  });
};
