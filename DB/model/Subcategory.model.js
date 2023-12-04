import mongoose, { Schema, model, Types } from "mongoose";
import { assetsSchema } from "../DB_utils/assets.schema.js";

const subcategorySchema = new Schema(
  {
    name: {
      ar: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
      },
      en: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
      },
    },
    slug: {
      ar: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
      },
      en: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
      },
    },
    image: assetsSchema,
    categoryId: { type: Types.ObjectId, ref: "Category", required: true },
    createdBy: { type: Types.ObjectId, ref: "Admin", required: true },
    customId: { type: String },
  },
  {
    timestamps: true,
  }
);

const subcategoryModel =
  mongoose.models.Subcategory || model("Subcategory", subcategorySchema);
export default subcategoryModel;
