import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

const productSlice =  createSlice({
    name: "cartItem",
    initialState: initialState,
    reducers: {
        addItemCart: (state, action) => {
            state.cart = [...action.payload];
        }
    }
});


export const { addItemCart } = productSlice.actions;

const cartReducer = productSlice.reducer;

export default cartReducer;


