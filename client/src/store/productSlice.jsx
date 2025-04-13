import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    allCategory: [],
    loadingCategory: false,
    allSubCategory: [],
    product: []
}

const productSlice = createSlice({
    name: 'product',
    initialState: initialValue,
    reducers: {
        setAllCategory: (state, action) => {
            state.allCategory = [...action.payload]
        },
        getAllProduct: () => {
            return 
        },
        setLoadingCategory: (state, action) => {
            state.loadingCategory = action.payload;
        },
        setAllSubCategory: (state, action) => {
            state.allSubCategory = [...action.payload]
        },
        getAllSubCategory: () => {
            return
        }
    }
});


export const { setAllCategory , getAllProduct , setAllSubCategory, getAllSubCategory, setLoadingCategory} = productSlice.actions;

export const productReducer = productSlice.reducer;