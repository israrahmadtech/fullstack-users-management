import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            sparse: true
        },
        username: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            sparse: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        image: {
            type: String,
            default: "",
        }
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
