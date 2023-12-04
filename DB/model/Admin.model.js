import mongoose , { Schema, model } from "mongoose";
import { personSchema } from "../DB_utils/person.schema.js";

const adminSchema = new Schema(
  {
    ...personSchema,
  },
  {
    timestamps: true,
  }
);

const adminModel = mongoose.models.Admin || model("Admin", adminSchema);
export default adminModel;