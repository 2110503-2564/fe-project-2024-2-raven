import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    telephone_number: {
      type: String,
      required: [true, "Please add telephone number"],
    },
    email: {
        type: String,
        required: [true, "Please add email"],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please add a valid email",
        ],
      },
    password: {
      type: String,
      required: [true, "Please add password"],
    },
    role: {
        type: String,
        enum: ["user", "admin", "moderator"], // Example roles
        required: [true, "Please add role"],
      },
    
    
        // ... other fields
        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
      { timestamps: true }

  
);

const User = mongoose.models.User || mongoose.model("User", UserSchema)
export default User