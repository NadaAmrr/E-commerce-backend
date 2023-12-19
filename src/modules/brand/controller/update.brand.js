import slugify from "slugify";
import cloudinary from "../../../utils/cloudinary.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
import brandModel from "../../../../DB/model/Brand.model.js";
/**
 * authorized: Admin
 * input: nameAR?, nameEN?, image?
 * output: update name
 * logic: Change name of brand or image By same admin that created brand
 */
export const updateBrand = async (req, res, next) => {
  const brand = await brandModel.findOne({
    _id: req.params.brandId,
    createdBy: req.user._id,
  });
  if (!brand) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_NOTFOUND_BRAND,
        StatusCodes.NOT_FOUND
      )
    );
  }
  if (req.body.nameAR || req.body.nameEN) {
    const { nameAR, nameEN } = req.body;
    // Find if anther brand have the same name
    if (req.body.nameAR != brand.nameAR && req.body.nameEN != brand.nameEN) {
      if (
        await brandModel.findOne({
          $or: [{ "name.ar": nameAR }, { "name.en": nameEN }],
          createdBy: req.user._id,
        })
      ) {
        return next(
          new ErrorClass(
            allMessages[req.query.ln].Fail_EXIST_BRAND,
            StatusCodes.BAD_REQUEST
          )
        );
      }
      brand.name = {
        ar: nameAR,
        en: nameEN,
      };
      brand.slug = {
        ar: slugify(nameAR, "-"),
        en: slugify(nameEN, "-"),
      };
    }
  }
  if (req.file) {
    await cloudinary.uploader.destroy(
      brand.image.public_id,
      (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log(result);
        }
      }
    );
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `${process.env.APP_NAME}/brand/${brand.customId}` },
      (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log(result);
        }
      }
    );
    brand.image = { secure_url, public_id };
  }
  await brand.save();
  if (!brand) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_UPDATE_BRAND,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  return res.status(StatusCodes.OK).json({
    message: allMessages[req.query.ln].SUCCESS_UPDATE_BRAND,
    brand,
  });
};
