import { assetsSchema } from "./assets.schema.js";
import { codeSchema } from "./code.schema.js";

export const personSchema = {
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  // loggedIn: { type: Boolean, default: false },
  status: { type: String, default: "offline", enum: ["offline", "online"] },
  confirmed: { type: Boolean, default: false },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: false,
  },
  image: assetsSchema,
  OTP: codeSchema,
  customId: String,
  DOB: { type: Date },
};
