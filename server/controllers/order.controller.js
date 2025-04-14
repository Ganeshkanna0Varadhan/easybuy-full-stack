import mongoose from "mongoose";
import OrderModel from "../models/orderModel.js";
import CartProductModel from "../models/cartProductModel.js";
import UserModel from "../models/userModel.js";
import Stripe from "../config/Stipe.js";
import AddressModel from "../models/addressModel.js";

export const cashOnDeliveryOrderController = async (req, res) => {
    try {
        const userId = req.userId;
        const {list_items, totalAmt, addressId, subTotalAmt } = req.body;

        const payload = list_items.map((el) => {
            return({
                userId: userId,
                orderId: `ORD-${new mongoose.Types.ObjectId()}`,
                productId: el.productId._id,
                product_details: {
                    name: el.productId.name,
                    image: el.productId.image
                },
                paymentId:"",
                payment_status: "CASH ON DELIVERY",
                delivery_address: addressId,
                subTotalAmt: subTotalAmt,
                totalAmt: totalAmt,
                invoice_receipt: ""
            })
        });


        const generatedOrder = await OrderModel.insertMany(payload);

        const removeCart = await CartProductModel.deleteMany({userId: userId});

        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            shopping_cart: []
        })
        
        return res.status(200).json({
            message: "Order placed successfully",
            error: false,
            success: true,
            data: generatedOrder
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


const priceWithDiscount = (price, dis) => {
    const discountAmount = Math.ceil((Number(price) * Number(dis)) / 100);
    const actualPrice = Number(price) - Number(discountAmount);
    return actualPrice;
}

export const paymentController = async (req, res) => {
    try {
        const userId = req.userId;
        const {list_items, totalAmt, addressId, subTotalAmt } = req.body;

        const user = await UserModel.findById(userId);

        const line_items = list_items.map((item) => {
            return {
                price_data:  {
                    currency: 'inr',
                    product_data: {
                        name: item.productId.name,
                        images: item.productId.image,
                        metadata: {
                            productId: item.productId._id
                        }
                    },
                    unit_amount: priceWithDiscount(item.productId.price, item.productId.discount) * 100,         
                },
                adjustable_quantity: {
                    enabled : true,
                    minimum : 1 
                },
                quantity: item.quantity,
            }
        });

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            customer_email: user.email,
            metadata: {
                userId: userId,
                addressId: addressId,
            },
            shipping_address_collection: {
                allowed_countries: ['US', 'IN'], // add the countries you support
            },
            line_items : line_items,
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        }

        const session = await Stripe.checkout.sessions.create(params);
        
        return res.status(200).json(session);
    }
    catch(err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

const getOrderProductItems = async ({
    lineItems, 
    userId, 
    addressId,
    paymentId,
    payment_status,
}) => {
    const productList = [];

    if (lineItems?.data?.length) {
        for (const item of lineItems.data) {
            const product = await Stripe.products.retrieve(item.price.product);
            const payload = {
                userId: userId,
                orderId: `ORD-${new mongoose.Types.ObjectId()}`,
                productId: product.metadata.productId,
                product_details: {
                    name: product.name,
                    image: product.images
                },
                paymentId: paymentId,
                payment_status: payment_status,
                delivery_address: addressId,
                subTotalAmt: Number(item.amount_total) / 100,
                totalAmt: Number(item.amount_total) / 100,
            }

            productList.push(payload);
        }
    }

    return productList;
}

export const webhookStripe = async (req, res) => {
    const event = req.body;
    const endPointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const lineItems = await Stripe.checkout.sessions.listLineItems(session.id);
            const userId = session.metadata.userId;
            const orderProduct = await getOrderProductItems({
                lineItems: lineItems, 
                userId: userId, 
                addressId: session.metadata.addressId,
                paymentId: session.payment_intent,
                payment_status: session.status,
            });
            
            const order = await OrderModel.insertMany(orderProduct);

            if (order) {
                const removeCartItems = await UserModel.findByIdAndUpdate(userId, {
                    shopping_cart: []
                });
                
                const removeCartProductDB = await CartProductModel.deleteMany({ userId: userId});
            }
        break;
    }

    res.json({received: true});
}

export const getOrderDetails = async (req, res) => {
    try {
        const userId = req.userId;

        const orderDetails = await OrderModel.find({userId: userId }).sort({createdAt: -1}).populate('delivery_address');

        return res.status(200).json({
            message: "order history",
            data: orderDetails,
            error: false,
            success: true
        })
    }
    catch(err) {
        return res.status(500).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}
