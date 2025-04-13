import { Router } from "express";
import auth from "../middleware/auth.js";
import { addCategory, deleteCategory, getCategory, updateCategory } from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post("/add-category", auth, addCategory);
categoryRouter.get('/get', getCategory);
categoryRouter.put('/update', auth, updateCategory);
categoryRouter.delete('/delete', auth, deleteCategory);
export default categoryRouter;