import { ErrorClass } from "../../../utils/errorClass.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { StatusCodes } from "http-status-codes";
import subcategoryModel from "../../../../DB/model/Subcategory.model.js";
/**
 * authorized: All
 * input: subcategoryId
 * output: get one subcategory
 * logic: Find one subcategory ? ✔️: ❎ not found
 */
export const getSubCategory = async (req, res, next) => {
  const subcategory = await subcategoryModel.findOne({
    _id: req.params.subcategoryId,
  });
  if (!subcategory) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_NOTFOUND_SUBCATEGORY,
        StatusCodes.NOT_FOUND
      )
    );
  }
  return res.status(StatusCodes.CREATED).json({
    message: allMessages[req.query.ln].SUCCESS,
    subcategory,
  });
};
