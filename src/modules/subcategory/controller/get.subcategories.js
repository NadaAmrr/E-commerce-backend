import subcategoryModel from "../../../../DB/model/Subcategory.model.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { StatusCodes } from "http-status-codes";
/**
 * authorized: All
 * input: subcategoryId
 * output: get one subcategory
 * Logic: Find one subcategory ? ✔️: ❎ not found
 */
export const getSubCategories = async (req, res, next) => {
  const subcategories = await subcategoryModel.find();
  if (!subcategories) {
    return next(
      new ErrorClass(allMessages[req.query.ln].NOT_FOUND, StatusCodes.NOT_FOUND)
    );
  }
  return res.status(StatusCodes.CREATED).json({
    message: allMessages[req.query.ln].SUCCESS_CATEGORIES,
    subcategories,
  });
};
