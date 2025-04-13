import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './userSlice'
import { productReducer } from './productSlice'
import cartReducer from './cart'
import addressReducer from './address'
import orderReducer from './order'

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cartItem: cartReducer,
    addresses: addressReducer,
    orders: orderReducer
  }
})