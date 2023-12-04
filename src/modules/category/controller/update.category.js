import slugify from "slugify";
import categoryModel from "../../../../DB/model/Category.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
/**
 * authorized: Admin
 * input: nameAR?, nameEN?, image?
 * output: update category
 * logic: Change name of category or image By same admin that created category
 */
export const updateCategory = async (req, res, next) => {
  //Should admin == req.user._id && categoryID ✔️
  const category = await categoryModel.findOne({
    _id: req.param.categoryId,
    createdBy: req.user._id,
  });
  if (!category) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_NOTFOUND_CATEGORY,
        StatusCodes.NOT_FOUND
      )
    );
  }
  if (req.body.nameAR || req.body.nameEN) {
    const { nameAR, nameEN } = req.body;
    // Find if anther category have the same name
    if (
      req.body.nameAR != category.nameAR &&
      req.body.nameEN != category.nameEN
    ) {
      if (
        await categoryModel.findOne({
          $or: [{ "name.ar": nameAR }, { "name.en": nameEN }],
          createdBy: req.user._id,
        })
      ) {
        return next(
          new ErrorClass(
            allMessages[req.query.ln].Fail_EXIST_CATEGORY,
            StatusCodes.BAD_REQUEST
          )
        );
      }
      category.name = {
        ar: nameAR,
        en: nameEN,
      };
      category.slug = {
        ar: slugify(nameAR, "-"),
        en: slugify(nameEN, "-"),
      };
    }
  }
  if (req.file.image) {
    category.customId = nanoid(5);
    await cloudinary.uploader.destroy(
      category.image.public_id,
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
      { folder: `${process.env.APP_NAME}/category/${customId}` },
      (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log(result);
        }
      }
    );
    category.image = { secure_url, public_id };
  }
  await category.save();
  if (!category) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_UPDATE_CATEGORY,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  return res.status(StatusCodes.CREATED).json({
    message: allMessages[req.query.ln].SUCCESS_UPDATE_CATEGORY,
    category,
  });
};
