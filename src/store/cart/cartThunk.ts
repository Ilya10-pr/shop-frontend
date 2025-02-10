import { createAsyncThunk } from "@reduxjs/toolkit";
import { addProductToCart, deleteProductFromCart, getProductFromCart } from "../../services/ProductServices";
import { IProduct } from "../../types/types";

export const getCartUserThunk = createAsyncThunk(
  "cart/getCartUserThunk",
  async () => {
    const response = await getProductFromCart();
    return response
  }
)

export const addProductToCartThunk = createAsyncThunk(
  "cart/addProductToCartThunk",
  async (product: IProduct) => {
    const response = await addProductToCart(product)
    return response
  }
)

export const deleteProductFromCartThunk = createAsyncThunk(
  "cart/deleteProductFromCart",
  async (id: string) => {
    const response = await deleteProductFromCart(id)
    return response
  }
)