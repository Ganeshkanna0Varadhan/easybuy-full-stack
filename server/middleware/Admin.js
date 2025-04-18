import UserModel from "../models/userModel.js";

const admin = async (req, res, next) => {
    try {
        const userId = req.userId;
        
        const user = await UserModel.findById(userId);

        if (user.role !== 'ADMIN') {
            return res.status(400).json({
                message: "Permission denied",
                error: true,
                success: false
            })
        }

        next();

    }
    catch(err) {
        return res.status(500).json({
            message: "Permission denied",
            error: true,
            success: false
        })
    }
}

export default admin