import mongoose, { Schema, model, Types } from "mongoose";
import { assetsSchema } from "../DB_utils/assets.schema.js";

const categorySchema = new Schema(
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
     description: { 
      ar: {
        type: String,
        lowercase: true,
      },
      en: {
        type: String,
        lowercase: true,
      },
     },
    image: assetsSchema,
    createdBy: { type: Types.ObjectId, ref: "Admin", required: false },
    customId: { type: String },
  },
  {
    timestamps: true,
  }
);

const categoryModel =
  mongoose.models.Category || model("Category", categorySchema);
export default categoryModel;
 