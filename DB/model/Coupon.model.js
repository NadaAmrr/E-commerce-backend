import mongoose, { Schema, model, Types } from "mongoose";
import { assetsSchema } from "../DB_utils/assets.schema.js";

const couponSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, lowercase: true },
    image: assetsSchema,
    amount: { type: Number, default: 1 },
    expireDate: Date,
    createdBy: { type: Types.ObjectId, ref: "Admin", required: false },
    usedBy: [{ type: Types.ObjectId, ref: "Customer", required: false }],
  },
  { timestamps: true }
);

const couponModel = mongoose.models.Coupon || model("Coupon", couponSchema);
export default couponModel;
