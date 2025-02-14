import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductById, getProducts, getProductsByOption, updateProduct } from "../../services/ProductServices";
import { IOptionProduct, IProduct } from "../../types/types";
import { getCartUserThunk } from "../cart/cartThunk";



export const getProductsThunk = createAsyncThunk(
  "products/getProductsThunk",
  async() => {
    const response = await getProducts()
    return response
  }
)

export const getProductByIdThunk = createAsyncThunk(
  "products/getProductByIdThunk",
  async(name: string) => {
    const response = await getProductById(name)
    return response 
  }
)

export const getProductsByOptionThunk = createAsyncThunk(
  "products/getProductsByCategoryThunk",
  async(payload: IOptionProduct) => {
    const response = await getProductsByOption(payload)
    return response 
  }
)

export const updateProductThunk = createAsyncThunk(
  "products/updateProductThunk",
  async(payload : {productId: string, data: {value: number} | IProduct}, {dispatch}) => {
    const {productId, data} = payload
    const response = await updateProduct(productId, data);
    if(response){
      dispatch(getCartUserThunk())
    }
    return response 
  }
)



