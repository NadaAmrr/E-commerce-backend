import cloudinary from "../../../utils/cloudinary.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { StatusCodes } from "http-status-codes";
import brandModel from "../../../../DB/model/Brand.model.js";
/**
 * authorized: Admin
 * input: createdBy - name
 * output: create brand
 * logic:
 */
export const createBrand = async (req, res, next) => {
  const { nameAR, nameEN } = req.body;
  if (
    await brandModel.findOne({
      $or: [{ "name.ar": nameAR }, { "name.en": nameEN }],
    })
  ) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_EXIST_BRAND,
        StatusCodes.CONFLICT
      )
    );
  }
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.APP_NAME}/brand` },
    (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
      }
    }
  );
  const brand = await brandModel.create({
    name: {
      ar: nameAR,
      en: nameEN,
    },
    image: { secure_url, public_id },
    createdBy: req.user._id,
  });
  if (!brand) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_CREATE_BRAND,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  return res.status(StatusCodes.CREATED).json({
    message: allMessages[req.query.ln].SUCCESS_CREATE_BRAND,
    brand,
  });
};
