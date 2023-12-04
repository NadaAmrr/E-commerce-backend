import mongoose, { Schema, model, Types } from "mongoose";
import { personSchema } from "../DB_utils/person.schema.js";

const customerSchema = new Schema(
  {
    ...personSchema,
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const customerModel =
  mongoose.models.Customer || model("Customer", customerSchema);
export default customerModel;
