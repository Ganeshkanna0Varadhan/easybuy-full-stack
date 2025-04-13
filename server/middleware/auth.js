import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const auth = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(' ')[1];

        if (!token) {
            res.status(401).json({
                message: 'Token is not defined'
            })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
        if (!decode) {
            return res.status(401).json({
                message: 'Unauthorized access',
                error: true, 
                success: false
            })
        }

        req.userId = decode.id;
        next();
    }
    catch(err) {
        res.status(500).json({
            message: "Please log in to continue" /* err.message || err */,
            error: true, 
            success: false
        })
    }
}

export default auth;