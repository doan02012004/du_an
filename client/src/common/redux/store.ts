import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from './features/productSlice'
import authReducer from './features/authSlice.ts'
import cartReducer from './features/cartSlice.ts'
const rootReducer = combineReducers({
    product:productReducer,
    auth:authReducer,
    cart:cartReducer
})
const store = configureStore({
    reducer: rootReducer
})

export default store