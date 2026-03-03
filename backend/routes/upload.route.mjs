import express from "express";
import upload from "../cloudinary/multer.mjs";
import { uploadImage } from "../controllers/upload.controller.mjs";

const uploadRouter = express.Router();

uploadRouter.post("/image", upload.single("image"), uploadImage);

export default uploadRouter;