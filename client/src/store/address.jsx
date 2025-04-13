import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addressList: []
}

const addressSlice = createSlice({
    name: "address",
    initialState: initialState,
    reducers: {
        addAddress: (state, action) => {
            state.addressList = [...action.payload]
        }   
    }
});


export const { addAddress } = addressSlice.actions;

const addressReducer = addressSlice.reducer;

export default addressReducer;