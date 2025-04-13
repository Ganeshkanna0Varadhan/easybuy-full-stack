import ProductModel from "../models/productModel.js";

export const createProduct = async (req, res) => {
    try {
        const { 
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details
        } = req.body;

        if (!name || !image[0] || !category[0] || !subCategory[0] || !unit || !price || !description) {
            return res.status(400).json({
                message: "Enter required fields",
                error: true,
                success: false
            })
        }

        const product = await ProductModel.create({ 
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details
        });

        return res.status(200).json({
            message: "Product Created Successfully",
            data: product,
            error: false,
            success: true
        })
    }
    catch(err) {
        res.status(200).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export const getProduct = async (req, res) => {
    try {
        const page = req.body.page || 1;
        const limit = req.body.limit || 10
        const search = req.body.search;

        const skip = (page -1) * limit;

        const query = search ? {
            $text: {
                $search : search
            }
        } : {}

        const [data, totalCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt: -1}).skip(skip).limit(limit).populate('category subCategory'),
            ProductModel.countDocuments(query)
        ])

        return res.status(200).json({
            message: "Product Data",
            error: false,
            success: true,
            totalCount: totalCount,
            totalNoPage: Math.ceil( totalCount / limit),
            data: data
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

export const getProductByCategory = async (req, res) => {
    try {
        
        const { _id } = req.body;

        console.log("_id ", _id);

        if (!_id) {
            return res.status(200).json({
                message: "Provide Category Id",
                error: true, 
                success: false
            })
        }

        const product = await ProductModel.find({category: { $in : _id }}).limit(15);

        console.log("products ", product);

        return res.status(200).json({
            message: "category product list",
            error: false,
            success: true,
            data: product
        })
    }
    catch(err) {
        return res.json(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export const getProductByCategoryAndSubCategory = async (req, res) => {
    try {
        const {categoryId, subCategoryId} = req.body;

        if (!categoryId || !subCategoryId) {
            return res.status(400).json({
                message: "Provide categoryId and subCategoryId",
                error: true,
                success: true
            })
        }

        const page = req.body?.page ? req.body?.page : 1;
        const limit = req.body?.limit ? req.body?.limit : 10;

        const query = {
            category : { $in : categoryId },
            subCategory: { $in: subCategoryId }
        }

        const skip = (page - 1) * limit;

        const [data, dataCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt: -1}).skip(skip).limit(limit),
            ProductModel.countDocuments(query)
        ])

        return res.status(200).json({
            message: "Product list",
            data: data,
            totalCount: dataCount,
            page: page,
            limit: limit,
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

export const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                message: "Provide the Product Id",
                success: false,
                error: true
            })
        }

        const product = await ProductModel.findById(productId);

        return res.status(200).json({
            message: "product details",
            data: product,
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

export const updateProductDetails = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({
                message: "Provide Product Id",
                error: true,
                success: false
            })
        }

        const updateProduct = await ProductModel.findByIdAndUpdate(_id, {
            ...req.body
        }, {new: true});
        
        return res.status(200).json({
            message: "Product Updated Successfully",
            data: updateProduct,
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

export const deleteProduct = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({
                message: "Provide Product Id",
                error: true,
                success: false
            })
        }

        const deleteProduct = await ProductModel.findByIdAndDelete(_id);

        return res.status(200).json({
            message: "Delete Successfully",
            error: false,
            success: true,
            data: deleteProduct
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

export const searchProduct = async (req, res) => {
    try {
        const { search } = req.body;
        const page = req.body.page ? req.body.page : 1;
        const limit = req.body.limit ? req.body.limit : 10;
        const skip = (page - 1) * limit;

        const query = search ? { 
            $text : {
                $search : search
            }
        } : {}

        const [data, dataCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1}).skip(skip).limit(limit).populate('category subCategory'),
            ProductModel.countDocuments(query)
        ]);

        return res.status(200).json({
            message: "Product data",
            error: false,
            success: true,
            data: data,
            totalCount: dataCount,
            totalPage: Math.ceil(dataCount/limit),
            page: page,
            limit: limit
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