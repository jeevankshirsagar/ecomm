// modelData.mjs
import { model, models, Schema } from "mongoose";
import { vendor } from "~/utils/modelData.mjs";

// Define a user schema using the Mongoose Schema class
const userSchema = new Schema(vendor);



export default models.vendor || model("vendor", userSchema);
