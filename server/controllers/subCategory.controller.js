import SubCategoryModel from "../models/subCategoryModel.js";

export const addSubCategory = async (req, res) => {
    try {
        const  { name, image, category} = req.body;
        if (!name || !image || !category[0]) {
            return res.status(400).json({
                message: "Provide name, image, category",
                error: true, 
                success: false
            }) 
        }

        const payload = {name, image, category};

        const subCategory = await SubCategoryModel.create(payload);

        return res.status(200).json({
            message: "Sub Category created",
            data: subCategory,
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

export const getSubCategory = async (req, res) => {
    try {
        const response = await SubCategoryModel.find().sort({createdAt: -1}).populate('category');
        return res.status(200).json({
            message: 'Sub Category Data',
            data: response,
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

export const updateSubCategory = async (req, res) => {
    try {
        const {_id, name, image, category} = req.body;

        const subCategory = await SubCategoryModel.findById(_id);

        if (!subCategory) {
            return res.status(400).json({
                message: "Category not found!",
                error: true,
                success: false
            })
        }

        const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id, {
            image, name, category
        });

        return res.status(200).json({
            message: "update Successfully",
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

export const deleteSubCategory = async (req, res) => {
    try {
        const { _id } = req.body;

        const delSubCategory = await SubCategoryModel.findByIdAndDelete(_id);

        res.status(200).json({
            message: "Delete Successfully",
            data: delSubCategory,
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