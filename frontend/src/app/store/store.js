import { configureStore } from "@reduxjs/toolkit";
import productReducers from "../features/product/productSlice";
import messageReducer from "../features/message/messageSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    Product: productReducers,
    User: userReducer,
    Message: messageReducer,
  },
});
