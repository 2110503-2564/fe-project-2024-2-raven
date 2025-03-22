import mongoose from "mongoose";
const CoworkingSpaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add co-working space name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add description"],
    },
    picture: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: [true, "Please add address"],
    },
    district: {
      type: String,
      required: [true, "Please add district"],
    },
    province: {
      type: String,
      required: [true, "Please add province"],
    },
    postalcode: {
      type: String,
      required: [true, "Please add postalcode"],
    },
    tel: {
      type: String,
      required: [true, "Please add telephone number"],
    },
    open_close_time: {
      type: String,
      required: [true, "Please add open_close_time"],
    },


  }
);

const CoworkingSpace = mongoose.models.CoworkingSpace || mongoose.model("CoworkingSpace", CoworkingSpaceSchema)
export default CoworkingSpace