import AddressModel from "../models/addressModel.js"
import UserModel from "../models/userModel.js"

export const addAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, address_line, city, state, pincode, country, mobile } = req.body;

        const createAddress = await AddressModel.create({
            name,
            address_line,
            city, 
            state,
            country,
            pincode,
            userId: userId,
            mobile

        });

        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            $push: {address_details: createAddress._id}
        })

        return res.status(200).json({
            message: "Address created Successfully",
            error: false,
            success: true,
            data: createAddress
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

export const getAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const addresss = await AddressModel.find({
            userId: userId, 
            status: true
        }).sort({createdAt: -1})

        return res.status(200).json({
            message: "Address list",
            error: false,
            success: true,
            data: addresss
        })
    }
    catch(err) {
        return res.status(500).json({
            message: err.message,
            error: true,
            success: false
        })
    }
}

export const updateAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const { _id, name, address_line, city, state, pincode, country, mobile } = req.body;

        const updateAddress = await AddressModel.updateOne({_id: _id, userId: userId}, {
            name: name,
            address_line: address_line,
            city: city, 
            state: state,
            pincode: pincode,
            country: country, 
            mobile: mobile
        });

        return res.status(200).json({
            message: "Address Updated Successfully",
            error: false,
            success: true,
            data: updateAddress
        })
    }
    catch(err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

export const deleteAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const { _id } = req.body;

        const disableAddress = await AddressModel.updateOne({
            _id: _id, userId: userId
        }, { status: false });

        return res.status(200).json({
            message: "Address removed",
            error: false,
            success: true,
            data: disableAddress
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