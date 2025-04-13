import CategoryModel from "../models/categoryModel.js";
import ProductModel from "../models/productModel.js";
import SubCategoryModel from "../models/subCategoryModel.js";

export const addCategory = async(req, res) => {
    try {
        const { name, image } = req.body;
        if (!name || !image) {
            return response.status(400).json({
                message: "Enter required fields",
                error: true,
                success: false
            })
        }

        const addCategory = await CategoryModel.create({name, image});

        if (!addCategory) {
            return res.status(500).json({
                message: 'Not created',
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            message: "Category added",
            data: addCategory,
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

export const getCategory = async (req, res) => {
    try {
        const data = await CategoryModel.find().sort({ createdAt: -1});
        
        res.status(200).json({
            data,
            error: false,
            success: true
        })
    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const {_id, name, image} = req.body;
        const update = await CategoryModel.findByIdAndUpdate(_id, {name, image}, {new: true});

        return res.status(200).json({
            message: "Category Updated",
            success: true, 
            error: false,
            data: update
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

export const deleteCategory = async (req, res) => {
    try {
        const { _id } = req.body;

        const checkSubCategory = await SubCategoryModel.find({
            category: { "$in" : [ _id ]}
        }).countDocuments();
        
        const checkProduct = await ProductModel.find({
            category: { "$in" : [ _id ]}
        }).countDocuments();

        if (checkSubCategory > 0 || checkProduct > 0) {
            return res.status(400).json({
                message: "Category is already use can't delete",
                error: true,
                success: false

            })
        }

        const deleteCategory = await CategoryModel.findByIdAndDelete(_id);

        return res.status(200).json({
            message: "Delete category Successfully",
            data: deleteCategory,
            error: false,
            success: true
        })
    }
    catch (err) {
        return res.status(500).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}