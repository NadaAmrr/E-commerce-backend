import slugify from "slugify";
import categoryModel from "../../../../DB/model/Category.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
/**
 * authorized: All
 * input: categoryId 
 * output: get one category
 * logic: Find one category ? ✔️: ❎ not found
 */
export const getCategory = async (req, res, next) => {
  const category = await categoryModel.findOne({
    _id: req.params.categoryId,
  });
  if (!category) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_NOTFOUND_CATEGORY,
        StatusCodes.NOT_FOUND
      )
    );
  }
  return res.status(StatusCodes.CREATED).json({
    message: allMessages[req.query.ln].SUCCESS,
    category,
  });
};
