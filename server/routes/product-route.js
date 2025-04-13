import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProductByCategory, getProductByCategoryAndSubCategory, getProductDetails, searchProduct, updateProductDetails } from "../controllers/product.controller.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/Admin.js";

const productRoute = Router();

productRoute.post("/create", auth, admin, createProduct);
productRoute.post("/get", getProduct);
productRoute.post('/get-product-by-category', getProductByCategory);
productRoute.post('/get-product-by-category-and-subcategory', getProductByCategoryAndSubCategory);
productRoute.post('/get-product-details', getProductDetails);
productRoute.put('/update-product',auth, admin, updateProductDetails);
productRoute.delete('/delete-product', auth, admin, deleteProduct);

productRoute.post('/search-product', searchProduct);

export default productRoute;