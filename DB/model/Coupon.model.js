import mongoose, { Schema, model, Types } from "mongoose";
import { assetsSchema } from "../DB_utils/assets.schema.js";

const couponSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true },
    image: assetsSchema,
    amount: { type: Number, default: 1 },
    expireDate: Date,
    createdBy: { type: Types.ObjectId, ref: "Admin", required: true },
    usedBy: [{ type: Types.ObjectId, ref: "Customer", required: false }],
  },
  { timestamps: true }
);

const couponModel = mongoose.models.coupon || model("coupon", couponSchema);
export default couponModel;
