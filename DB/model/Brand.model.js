import mongoose, { Schema, model, Types } from "mongoose";
import { assetsSchema } from "../DB_utils/assets.schema.js";

const brandSchema = new Schema(
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
    image: assetsSchema,
    createdBy: { type: Types.ObjectId, ref: "Admin", required: true },
  },
  { timestamps: true }
);

const brandModel = mongoose.models.Brand || model("Brand", brandSchema);
export default brandModel;
