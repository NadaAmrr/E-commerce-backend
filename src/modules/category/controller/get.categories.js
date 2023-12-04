import categoryModel from "../../../../DB/model/Category.model.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { StatusCodes } from "http-status-codes";
/**
 * authorized: All
 * input: categoryId
 * output: get one category
 * Logic: Find one category ? ✔️: ❎ not found
 */
export const getCategories = async (req, res, next) => {
  const categories = await categoryModel.find();
  if (!categories) {
    return next(
      new ErrorClass(allMessages[req.query.ln].NOT_FOUND, StatusCodes.NOT_FOUND)
    );
  }
  return res.status(StatusCodes.CREATED).json({
    message: allMessages[req.query.ln].SUCCESS_CATEGORIES,
    categories,
  });
};
