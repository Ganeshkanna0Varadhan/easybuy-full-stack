export const baseURL = import.meta.env.VITE_API_URL

export const SummaryApi = {
    register: {
        url: "/api/user/register",
        method: "post",
    },
    login: {
        url: '/api/user/login',
        method: "post"
    }, 
    forgot_password: {
        url: '/api/user/forgot-password',
        method: "put"
    },
    otp_verification: {
        url: '/api/user/verify-forgot-password-otp',
        method: "put"
    },
    reset_password: {
        url: "/api/user/reset-password",
        method: 'put'
    },
    refresh_token: {
        url: '/api/user/refresh-token',
        method: "post"
    },
    user_details: {
        url: "/api/user/user-details",
        method: 'get'
    },
    logout: {
        url: "/api/user/logout",
        method: 'get'
    },
    uploadAvatar: {
        url: "/api/user/upload-avatar",
        method: 'put'
    },
    updateUser: {
        url: "/api/user/update-user",
        method: "put"
    },
    addCategory: {
        url: '/api/category/add-category',
        method: "post"
    },
    uploadImage: {
        url: "/api/file/upload",
        method: "post"
    },
    getCategory : {
        url: "/api/category/get",
        method: "get"
    },
    updateCategory: {
        url: '/api/category/update',
        method: 'put'
    },
    deleteCategory: {
        url: '/api/category/delete',
        method: 'delete'
    },
    addSubCategory: {
        url: "/api/subcategory/create",
        method: "post"
    },
    getSubCategory: {
        url: "/api/subcategory/get",
        method: "post"
    },
    updateSubCategory: {
        url: "/api/subcategory/update",
        method: "put"
    },
    deleteSubCategory: {
        url: "/api/subcategory/delete",
        method: "delete"
    },
    createProduct: {
        url: "/api/product/create",
        method: "post"
    },
    getProduct: {
        url: "/api/product/get",
        method: "post"
    },
    getProductByCategory: {
        url: "/api/product/get-product-by-category",
        method: "post"
    },
    getProductByCategoryAndSubcategory: {
        url: "/api/product/get-product-by-category-and-subcategory",
        method: "post"
    },
    getProductDetails: {
        url: "/api/product/get-product-details",
        method: "post"
    },
    updateProductDetails: {
        url: "/api/product/update-product",
        method: "put"
    }, 
    deleteProduct: {
        url: "/api/product/delete-product",
        method: "delete"
    },
    searchProduct: {
        url: "/api/product/search-product",
        method: "post"
    },
    addToCart: {
        url: "/api/cart/create",
        method: "post"
    },
    getCartItem: {
        url: "/api/cart/get",
        method: "get"
    },
    updateCartItem: {
        url: "/api/cart/update",
        method: "put"
    },
    deleteCartItem: {
        url: "/api/cart/delete",
        method: "delete"
    },
    addAddress: {
        url: "/api/address/create",
        method: "post"
    },
    getAddress: {
        url: "/api/address/get",
        method: "get"
    },
    updateAddress: {
        url: "/api/address/update",
        method: "put"
    },
    deleteAddress: {
        url: '/api/address/delete',
        method: "delete"
    },
    cashOnDeliveryOrder: {
        url: "/api/order/cash-on-delivery",
        method: "post"
    },
    paymentCheckout: {
        url: "/api/order/checkout",
        method: "post"
    },
    getOrderItems: {
        url: "/api/order/order-list",
        method: "get"
    }
}
