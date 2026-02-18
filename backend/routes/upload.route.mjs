import express from "express";
import upload from "../cloudinary/multer.mjs";

const uploadRouter = express.Router()

uploadRouter.post("/image", upload.single("image"), (req, res) => {
    res.json({
        message: "Image upload successfully",
        imageUrl: req.file.path
    })
})

export default uploadRouter