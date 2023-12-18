import slugify from "slugify";
import subcategoryModel from "../../../../DB/model/Subcategory.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
/**
 * Authoried: Admin
 * input: nameAR, nameEN , image?
 * output: create subcategory
 * Logic: Find if subcategory name found before? ✔️ Exist name : ❎
 */
export const createSubCategory = async (req, res, next) => {
  const { nameAR, nameEN } = req.body;
  const { categoryId } = req.params;
  if (
    await subcategoryModel.findOne({
      $or: [{ "name.ar": nameAR }, { "name.en": nameEN }],
      categoryId,
    })
  ) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_EXIST_SUBCATEGORY,
        StatusCodes.CONFLICT
      )
    );
  }
  const customId = nanoid(5);
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.APP_NAME}/subcategory/${customId}` },
    (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
      }
    }
  );
  const subcategory = await subcategoryModel.create({
    name: {
      ar: nameAR,
      en: nameEN,
    },
    slug: {
      ar: slugify(nameAR, "-"),
      en: slugify(nameEN, "-"),
    },
    image: { secure_url, public_id },
    description: {
      ar: req.body.descriptionAR,
      en: req.body.descriptionAR,
    },
    customId,
    categoryId,
    createdBy: req.user._id,
  });
  if (!subcategory) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_CREATE_SUBCATEGORY,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  return res.status(StatusCodes.CREATED).json({
    message: allMessages[req.query.ln].SUCCESS_CREATE_SUBCATEGORY,
    subcategory,
  });
};
