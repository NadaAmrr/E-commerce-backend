import slugify from "slugify";
import categoryModel from "../../../../DB/model/Category.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { allMessages } from "../../../utils/localizationHelper.js";
import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
/**
 * Authoried: Admin 
 * input: nameAR, nameEN , image?
 * output: create category
 * Logic: Find if category name found before? ✔️ Exist name : ❎
 */
export const createSubCategory = async (req, res, next) => {
  const { nameAR, nameEN } = req.body;
  if (
    await categoryModel.findOne({
      $or: [{ "name.ar": nameAR }, { "name.en": nameEN }],
    })
  ) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_EXIST_CATEGORY,
        StatusCodes.CONFLICT
      )
    );
  }
  const customId = nanoid(5);
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
  const category = await categoryModel.create({
    name: {
      ar: nameAR,
      en: nameEN,
    },
    slug: {
      ar: slugify(nameAR, "-"),
      en: slugify(nameEN, "-"),
    },
    image: { secure_url, public_id },
    customId,
  });
  if (!category) {
    return next(
      new ErrorClass(
        allMessages[req.query.ln].Fail_CREATE_CATEGORY,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  return res
    .status(StatusCodes.CREATED)
    .json({
      message: allMessages[req.query.ln].SUCCESS_CREATE_CATEGORY,
      category,
    });
};
