import { configureStore } from '@reduxjs/toolkit'
import  authSlice  from './auth/authSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import cartSlice from "./cart/cartSlice"

const store = configureStore({
  reducer: {
    user: authSlice,
    cart: cartSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

