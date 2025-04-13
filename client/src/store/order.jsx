import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: []
    },
    reducers: {
        setOrder: (state, action) => {
            state.order = [...action.payload];
        }
    }
});

export const {setOrder} = orderSlice.actions;

const orderReducer = orderSlice.reducer;

export default orderReducer;


