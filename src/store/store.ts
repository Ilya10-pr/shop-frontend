import { configureStore } from '@reduxjs/toolkit'
import  authSlice  from './auth/authSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import cartSlice from "./cart/cartSlice"
import productsSlice from "./product/productsSlice"

const store = configureStore({
  reducer: {
    user: authSlice,
    cart: cartSlice,
    products: productsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

