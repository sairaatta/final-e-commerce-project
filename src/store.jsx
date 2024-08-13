import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./redux/cartSlice";
import productReducer from "./redux/productSlice";
import userReducer from './redux/userSlice';
import ordersReducer from './redux/orderSlice';
const store = configureStore({
    reducer: {
        cart :cartSlice,
        orders: ordersReducer,
        product : productReducer,
        users: userReducer,
        
    }
});
export default store;