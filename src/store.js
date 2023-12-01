import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice.js";
import messageReducer from "./redux/messageSlice.js";
// import cartReducer from './redux/cartSlice'
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "vijay",
  storage,
};

const reducer = combineReducers({
  user: userReducer,
  messages: messageReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
