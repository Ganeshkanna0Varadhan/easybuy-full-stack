import CartProductModel from "../models/cartProductModel.js";
import  UserModel from '../models/userModel.js'

export const addToCartItem = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                message: "Provide productId",
                error: true,
                success: false
            })
        }

        const checkCartItem = await CartProductModel.find({ userId: userId, productId: productId});

        if (checkCartItem[0]) {
            return res.status(400).json({
                message: "Item already in cart",
                error: true,
                success: false
            })
        }

        const cartItem = await CartProductModel.create({quantity: 1, userId: userId, productId: productId});

        const updateCartUser = await UserModel.findByIdAndUpdate(userId, {
            $push: {
                shopping_cart: productId
            }
        });


        return res.status(200).json({
            data: cartItem,
            message: "Add to Cart Successfully",
            success: true,
            error: false
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

export const getCartItem = async (req, res) => {
    try {
        const userId = req.userId;
        
        const cartItem = await CartProductModel.find({
            userId: userId,
        }).populate('productId');

        return res.status(200).json({
            data: cartItem,
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

export const updateCartItemQty = async (req, res) => {
    try {
        const userId = req.userId;
        const { _id, qty } = req.body;

        if (!_id || !qty) {
            return res.status(400).json({
                message: "Provide id and Qty",
                error: true,
                success: false,
            })
        }

        const updateCartItem = await CartProductModel.updateOne({
           _id: _id ,
           userId: userId
        }, { quantity: qty });

        return res.status(200).json({
            message: "Cart Updated",
            success: true,
            error: false,
            data: updateCartItem
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

export const deleteCartItem = async (req, res) => {
    try {
        const userId = req.userId;
        const { _id } = req.body;

        if (!_id) {
            return status(400).json({
                message: "Provide product Id",
                error: true,
                success: false
            })
        }

        const deleteCartItem = await CartProductModel.deleteOne({_id: _id, userId: userId});

        // const updateUser = await UserModel.updateOne({_id: userId}, {
        //     {$pull: {shopping_cart: }}
        // })

        return res.status(200).json({
            message: "Item removed",
            error: false,
            success: true,
            data: deleteCartItem
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