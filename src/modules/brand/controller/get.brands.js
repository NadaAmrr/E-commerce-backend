import brandModel from "../../../../DB/model/Brand.model.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { StatusCodes } from "http-status-codes";
/**
 * authorized: All
 * input: brandId
 * output: get one Brand
 * logic: Find one Brand ? ✔️: ❎ not found
 */
export const getBrand = async (req, res, next) => {
  let brand;
  if (req.params.brandId) {
    brand = await brandModel.findOne({
      _id: req.params.brandId,
    });
  } else {
    brand = await brandModel.find();
  }
  if (!brand) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_NOTFOUND_BRAND,
        StatusCodes.NOT_FOUND
      )
    );
  }
  return res.status(StatusCodes.CREATED).json({
    message: allMessages[req.query.ln].SUCCESS,
    brand,
  });
};
