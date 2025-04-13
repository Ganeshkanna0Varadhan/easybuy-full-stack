import UserModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import sendEmail from "../config/sendEmail.js";
import {verifyEmailTemplate, otpEmailTemplate} from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOtp from "../utils/generateOTP.js";
import jwt from 'jsonwebtoken';

export const registerUserController = async (req, res) => {
    try {
        const { name, email, password} = req.body;
        if (!email || !name || !password)  {
            return res.status(200).json({
                message: 'Not provide the name, email, password',
                error: true, 
                success: false
            })
        }

        const user = await UserModel.findOne({ email });
        
        if (user) {
            return res.json({
                message: 'Already register email',
                error: true, 
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const payLoad = {
            name, 
            email,
            password : hashPassword
        }

        const newUser = await UserModel.create(payLoad);

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${newUser._id}`;

        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify email from easybuy",
            html: verifyEmailTemplate({name, url: verifyEmailUrl })
        })

        res.status(201).json({
            message: 'User register Successfully',
            error: false,
            success: true, 
            data: newUser
        })

    }
    catch(err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export const verifyEmailController = async (req, res) => {
    try {
        const { code } = req.body;
        const user = await UserModel.findById(code);
        if (!user) {
            return res.status(400).json({
                message: "Invalid code",
                error: true, 
                success: false
            })
        }
        const updateUser = await UserModel.findByIdAndUpdate(code, {verify_email: true});

        return res.json({
            message: "Verfication successfully Done!!!",
            error: false, 
            success: true
        })

    }
    catch(err) {
        return res.status(500).json({
            message: err.message || err,
            error: true, 
            success: false
        })
    }

}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                messsage: 'Email, password is empty',
                error: true, 
                success: false
            })
        }

        const user = await UserModel.findOne({email}).select("+password");
        if (!user) {
            return res.status(400).json({
                message: 'User is not Register',
                error: true, 
                success: false
            })
        }

        if (user.status !== "Active") {
            return res.status(400).json({
                message: 'Contact to Admin',
                error: true, 
                success: false
            })
        }

        const checkPassword = await bcryptjs.compare(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({
                message: "password is incorrect",
                error: true, 
                success: false
            })
        }

        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);

        const updateUser = await UserModel.findByIdAndUpdate(user._id, {
            last_login_date: new Date()
        })

        const cookieOption = {
            httpOnly: true, 
            secure: true, 
            sameSite: "None"
        }

        res.cookie('accessToken', accessToken, cookieOption);
        res.cookie('refreshToken', refreshToken, cookieOption);

        res.json({
            message: 'Login successfully',
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        })

    }
    catch(err) {
        return res.status(500).json({
            message: err.message || err,
            error: true, 
            success: false
        })
    }
}

export const logoutController = async (req, res) => {
    try {

        const userId = req.userId;

        const cookieOptions = {
            httpOnly: true,
            secure: true, 
            sameSite: "none"
        }

        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {refresh_token: ""}); 

        return res.json({
            message: 'Logout Successfully',
            error: false,
            success: true
        })
    }
    catch(err) {
        res.status(500).json({
            message: err.message || err,
            error: true, 
            success: false
        })
    }
}

export const uploadAvator = async (req, res) => {
    try {
        const userId = req.userId;
        const file = req.file;
        const upload = await uploadImageCloudinary(file);

        const user = await UserModel.findByIdAndUpdate(userId, { avatar: upload.url})

        return res.status(200).json({
            message: 'uploaded profile',
            success: true,
            error: false,
            data: {
                id: user._id,
                avatar: upload.url
            }
        })
    }
    catch(err) {
        res.status(500).json({
            message: err.message || err,
            error: true, 
            success: false
        })
    }
}

export const updateUserDetails = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, email, mobile, password} = req.body;
        let hashPassword = "";
        if (password) {
            const salt = await bcryptjs.genSalt(10);
            hashPassword = await bcryptjs.hash(password, salt);
        }

        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            ...(name && {name: name}),
            ...(email && {email: email}),
            ...(mobile && {mobile: mobile}),
            ...(password && {password: hashPassword})
        }, {new: true});

        return res.status(200).json({
            message: "Update successfully",
            error: false, 
            success: true, 
            data: updateUser
        })
    }
    catch(err) {
        return res.status(500).json({
            message: err.message || err,
            error: true, 
            success: false
        })
    }
}

export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Email not available",
                error: true, 
                success: false
            })
        }

        const otp = generateOtp();
        const expireTime = new Date().getTime() + 60 * 60 * 1000;

        const update = await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: otp,
            forgot_password_expiry: new Date(expireTime).toISOString()
        });

        await sendEmail({
            sendTo: email,
            subject: 'Forgot password from Easybuy',
            html: otpEmailTemplate(user.name, otp)
        })

        return res.status(200).json({
            message: "check your email", 
            error: false,
            success: true
        })

    }
    catch(err) {
        return res.status(500).json({
            message: err.message || err,
            error: true, 
            success: false
        })
    }
}

export const verifyForgotPasswordOtp = async (req, res) => {
    try {
        const { email, otp} = req.body;

        if (!email | !otp) {
            return res.status(400).json({
                message: "email and OTP is required",
                error: true, 
                success: false

            })
        }
        const user = await UserModel.findOne({email});

        if (!user) {
            return res.status(400).json({
                message: "User not found with this email",
                error: true,
                success: false
            })
        }

        const currentTime = new Date().toISOString();

        if (user.forgot_password_expiry < currentTime) {
            return res.status(400).json({
                message: "Otp is expired",
                error: true,
                success: false
            })
        }

        if (user.forgot_password_otp !== otp) {
            return res.status(400).json({
                message: "Invalid Otp",
                error: true, 
                success: false
            })
        }

        return res.status(200).json({
            message: "Verify Otp successfully",
            error: false,
            success: true
        })
    }
    catch(err) {
        return res.status(500).json({
            message: err.message || err,
            error: true, 
            success: false
        })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email , newPassword, confirmPassword} = req.body;

        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: 'required field email, newPassword, confirmPassword',
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({email});

        if (!user) {
            return res.status(400).json({
                message: "User not found with this email",
                error: true,
                success: false
            })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: 'NewPassword and confirmPassword is not same',
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(newPassword, salt);

        const update = await UserModel.findByIdAndUpdate(user._id, {
            password: hashPassword,
        })

        const revertOTP = await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: null,
            forgot_password_expiry: ""
        })

        return res.status(200).json({
            message: "Password updated successfully",
            error: false,
            success: true
        })


    }
    catch(err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken || req?.header?.authorization?.split(" ")[1];

        if (!token) {
            return res.status(400).json({
                message: "Unauthorized access",
                error: true,
                success: false
            })
        }

        const verifyToken = await jwt.verify(token, process.env.SECRET_KEY_REFRESH_TOKEN);

        if (!verifyToken) {
            return res.status(401).json({
                message: "token is expired",
                error: true,
                success: false
            })
        }

        const userId = verifyToken.id;

        const newAccessToken = await generateAccessToken(userId);

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        
        res.cookie('accessToken', newAccessToken, cookieOptions);

        res.status(200).json({
            message: "New Access token generated",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
            }
        })

    }
    catch(err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export const userDetails = async (req, res ) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                message: "Please Login",
                error: true,
                success: false
            })
        }


        const user = await UserModel.findById(userId).select('-refresh_token');

        return res.status(200).json({
            message: "user details",
            data: user,
            success: true,
            error: false
        })
    }
    catch(err) {
        return res.status(err.statusCode || 500).json({
            message: err.message || err,
            error: true, 
            success: false
        })
    }
}