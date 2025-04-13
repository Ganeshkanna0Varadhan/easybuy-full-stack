import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

const uploadImageController = async (req, res) => {
    try {
        const file = req.file;
        const uploadImage = await uploadImageCloudinary(file);
        
        return res.status(200).json({
            message: "Upload done",
            data: uploadImage,
            success: true,
            error: false
        })
    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export default uploadImageController;