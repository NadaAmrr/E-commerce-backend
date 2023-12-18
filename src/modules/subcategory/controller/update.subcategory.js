import slugify from "slugify";
import subcategoryModel from "../../../../DB/model/Subcategory.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { StatusCodes } from "http-status-codes";
/**
 * authorized: Admin
 * input: nameAR?, nameEN?, image?
 * output: update Subcategory
 * logic: Change name of subcategory or image By same admin that created subcategory
 */
export const updateSubCategory = async (req, res, next) => {
  //Should admin == req.user._id && categoryID ✔️
  const subcategory = await subcategoryModel
    .findOne({
      categoryId: req.params.categoryId,
      _id: req.params.subcategoryId,
      createdBy: req.user._id,
    })
    .populate({
      path: "categoryId",
      select: "customId",
    });
  if (!subcategory) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_NOTFOUND_SUBCATEGORY,
        StatusCodes.NOT_FOUND
      )
    );
  }
  if (req.body.nameAR || req.body.nameEN) {
    const { nameAR, nameEN } = req.body;
    // Find if anther subcategory have the same name
    if (
      req.body.nameAR != subcategory.nameAR &&
      req.body.nameEN != subcategory.nameEN
    ) {
      if (
        await subcategoryModel.findOne({
          $or: [{ "name.ar": nameAR }, { "name.en": nameEN }],
          createdBy: { $ne: req.user._id },
          categoryId: req.param.categoryId,
        })
      ) {
        return next(
          new ErrorClass(
            allMessages[req.query.ln].Fail_EXIST_SUBCATEGORY,
            StatusCodes.BAD_REQUEST
          )
        );
      }
      subcategory.name = {
        ar: nameAR,
        en: nameEN,
      };
      subcategory.slug = {
        ar: slugify(nameAR, "-"),
        en: slugify(nameEN, "-"),
      };
    }
  }
  if (req.body.descriptionAR || req.body.descriptionAR) {
    subcategory.description = {
      ar: req.body.descriptionAR,
      en: req.body.descriptionAR,
    };
  }
  if (req.file) {
    await cloudinary.uploader.destroy(
      subcategory.image.public_id,
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
      { folder: `${process.env.APP_NAME}/subcategory/${subcategory.customId}` },
      (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log(result);
        }
      }
    );
    subcategory.image = { secure_url, public_id };
  }
  await subcategory.save();
  if (!subcategory) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_UPDATE_SUBCATEGORY,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  return res.status(StatusCodes.CREATED).json({
    message: allMessages[req.query.ln].SUCCESS_UPDATE_SUBCATEGORY,
    subcategory,
  });
};
