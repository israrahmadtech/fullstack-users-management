import cloudinary from "../cloudinary/cloudinary.mjs";

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "uploads" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(req.file.buffer);
        });

        res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl: result.secure_url
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};