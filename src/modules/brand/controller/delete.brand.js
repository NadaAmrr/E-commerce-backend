import brandModel from "../../../../DB/model/Brand.model.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { StatusCodes } from "http-status-codes";
/**
 * authorized: Admin
 * input: brandId
 * output: delete brand
 * logic: Find brand and createdBy that admin? ✔️ deleted : ❎
 */
export const deleted = async (req, res, next) => {
  const brand = await brandModel.findOne({
    _id: req.params.brandId,
    createdBy: req.user._id,
  });
  if (!brand) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_NOTFOUND_BRAND,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  const deleted = await brandModel.deleteOne({
    _id: req.params.brandId,
    createdBy: req.user._id,
  });
  return res.status(StatusCodes.CREATED).json({
    message: allMessages[req.query.ln].SUCCESS_DELETE_BRAND,
    deleted,
  });
};
