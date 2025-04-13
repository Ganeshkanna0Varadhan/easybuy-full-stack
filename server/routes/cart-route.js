import { Router } from "express";
import auth from "../middleware/auth.js";
import { addToCartItem, deleteCartItem,  getCartItem, updateCartItemQty } from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post('/create', auth, addToCartItem);

cartRouter.get('/get', auth, getCartItem);

cartRouter.put('/update', auth, updateCartItemQty);

cartRouter.delete('/delete', auth, deleteCartItem);

export default cartRouter;