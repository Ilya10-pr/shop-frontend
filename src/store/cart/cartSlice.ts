import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addProductToCartThunk, deleteProductFromCartThunk, getCartUserThunk } from "./cartThunk";
import { ICartState, ICartResponse } from "../../types/types";


const initialState: ICartState = {
  cartUser: null,
  isLoading: false,
  isError: null
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder 
  //         .addCase(getCartUserThunk.pending, (state) => {
  //           state.isLoading = true,
  //           state.isError = null
  //         })
  //         .addCase(getCartUserThunk.fulfilled, (state, action: PayloadAction<ICartResponse[]>) => {
  //           state.cartUser = action.payload,
  //           state.isLoading = false,
  //           state.isError = null
  //         })
  //         .addCase(getCartUserThunk.rejected, (state, action) => {
  //           state.isLoading = false,
  //           state.isError = action.payload as string
  //         })

  //         .addCase(addProductToCartThunk.pending, (state) => {
  //           state.isLoading = true
  //           state.isError = null
  //         })
  //         .addCase(addProductToCartThunk.fulfilled, (state, action: PayloadAction<ICartResponse[]>) => {
  //           state.cartUser = action.payload
  //           state.isLoading = false,
  //           state.isError = null
  //         })
  //         .addCase(addProductToCartThunk.rejected, (state, action) => {
  //           state.isError = action.payload as string
  //           state.isLoading = false
  //         })

  //         .addCase(deleteProductFromCartThunk.pending, (state) => {
  //           state.isLoading = true
  //           state.isError = null
  //         })
  //         .addCase(deleteProductFromCartThunk.fulfilled, (state, action: PayloadAction<ICartResponse[]>) => {
  //           state.cartUser = action.payload
  //           state.isLoading = false,
  //           state.isError = null
  //         })
  //         .addCase(deleteProductFromCartThunk.rejected, (state, action) => {
  //           state.isError = action.payload as string
  //           state.isLoading = false
  //         })
  // }
})


export const {} = cartSlice.actions;

export default cartSlice.reducer