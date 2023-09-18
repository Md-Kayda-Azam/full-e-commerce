import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import productSlice from "../features/product/productSlice";

// create store
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

// export default
export default store;
