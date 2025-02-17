import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct, deleteProduct, getProductById, getProducts, getProductsByOption, updateCountBuyProduct, updateProduct, updateRatingProduct } from "../../services/ProductServices";
import { IOptionProduct, IProduct } from "../../types/types";
import { getCartUserThunk } from "../cart/cartThunk";
import { IFormEditProduct } from "../../components/AdminUI/AddProduct/AddProductModal";



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

export const updateRatingProductThunk = createAsyncThunk(
  "products/updateProductThunk",
  async(payload : {productId: string, data: {value: number} | IProduct}, {dispatch}) => {
    const {productId, data} = payload
    const response = await updateRatingProduct(productId, data);
    if(response){
      dispatch(getCartUserThunk())
    }
    return response 
  }
)

export const updateProductThunk = createAsyncThunk(
  "products/updateProductThunk",
  async(payload: {productData: IFormEditProduct, productId: string}, {dispatch}) => {
    const {productData, productId} = payload
    const response = await updateProduct(productData, productId)
    // await dispatch(getProductsThunk())
    return response
  }
)

export const createProductThunk = createAsyncThunk(
  "products/createProductThunk",
  async(payload: IFormEditProduct, {dispatch}) => {
    const response = await createProduct(payload)
    await dispatch(getProductsThunk())
    return response
  }
)

export const deleteProductThunk = createAsyncThunk(
  "products/deleteProduct",
  async(productId: string, {dispatch}) => {
    const response = await deleteProduct(productId)
    await dispatch(getProductsThunk())
    return response
  }
)



