import {configureStore} from '@reduxjs/toolkit'
import userReducer from './redux/userSlice.js';
// import cartReducer from './redux/cartSlice'
import {combineReducers} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig ={
  key:"vijay",
  storage
}
 
const reducer = combineReducers({
    user:userReducer,
    // cart:cartReducer
})

const persistedReducer = persistReducer(persistConfig,reducer)

const store = configureStore({
    reducer:persistedReducer
})


export default  store;