import slugify from "slugify";
import categoryModel from "../../../../DB/model/Category.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { StatusCodes } from "http-status-codes";
import subcategoryModel from "../../../../DB/model/Subcategory.model.js";
/**
 * authorized: Admin
 * input: categoryId
 * output: delete subcategory
 * logic: Find subcategory and createdBy that admin? ✔️ deleted : ❎
 */
export const deleted = async (req, res, next) => {
  const subcategory = await subcategoryModel.findOne({
    _id: req.params.subcategoryId,
    createdBy: req.user._id,
  });
  if (!subcategory) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_NOTFOUND_SUBCATEGORY,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  const deleted = await subcategoryModel.deleteOne({
    _id: req.params.subcategoryId,
    createdBy: req.user._id,
  });
  return res.status(StatusCodes.CREATED).json({
    message: allMessages[req.query.ln].SUCCESS_DELETE_SUBCATEGORY,
    deleted,
  });
};
