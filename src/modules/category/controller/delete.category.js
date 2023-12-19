import categoryModel from "../../../../DB/model/Category.model.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { StatusCodes } from "http-status-codes";
/**
 * authorized: Admin
 * input: categoryId
 * output: delete category
 * logic: Find category and createdBy that admin? ✔️ deleted : ❎
 */
export const deleted = async (req, res, next) => {
  const category = await categoryModel.findOne({
    _id: req.params.categoryId,
    createdBy: req.user._id,
  });
  if (!category) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_NOTFOUND_CATEGORY,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  const deleted = await categoryModel.deleteOne({
    _id: req.params.categoryId,
    createdBy: req.user._id,
  });
  return res.status(StatusCodes.CREATED).json({
    message: allMessages[req.query.ln].SUCCESS_DELETE_CATEGORY,
    deleted,
  });
};
