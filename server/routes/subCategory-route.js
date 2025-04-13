import { Router } from "express";
import auth from "../middleware/auth.js";
import { addSubCategory, deleteSubCategory, getSubCategory, updateSubCategory } from "../controllers/subCategory.controller.js";

const subCategoryRouter = Router();

subCategoryRouter.post("/create", auth, addSubCategory);
subCategoryRouter.post("/get", getSubCategory);
subCategoryRouter.put("/update", auth, updateSubCategory);
subCategoryRouter.delete("/delete", auth, deleteSubCategory);

export default subCategoryRouter;