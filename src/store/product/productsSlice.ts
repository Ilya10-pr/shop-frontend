import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getProductByIdThunk, getProductsByOptionThunk, getProductsThunk, updateRatingProductThunk } from "./productsThunk"
import { IProduct, IProductState } from "../../types/types"

const initialState: IProductState = {
  allProducts: null,
  selectedProduct: null,
  productsForEdit: null,
  isLoading: false,
  isError: null
}


const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsForEdit: (state, action) => {
      state.productsForEdit = state.allProducts ?  state.allProducts.filter((product) => product.name.toLowerCase().includes(action.payload.toLowerCase())): null
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getProductsThunk.pending, (state) => {
      state.isLoading = true,
      state.isError = null
    })
    .addCase(getProductsThunk.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
      state.allProducts = action.payload,
      state.isLoading = false,
      state.isError = null
    })
    .addCase(getProductsThunk.rejected, (state, action) => {
      state.isLoading = false,
      state.isError = action.payload as string
    })

    .addCase(getProductByIdThunk.pending, (state) => {
      state.isLoading = true
      state.isError = null
    })
    .addCase(getProductByIdThunk.fulfilled, (state, action: PayloadAction<IProduct>) => {
      state.selectedProduct = action.payload
      state.isLoading = false,
      state.isError = null
    })
    .addCase(getProductByIdThunk.rejected, (state, action) => {
      state.isError = action.payload as string
      state.isLoading = false
    })

    .addCase(getProductsByOptionThunk.pending, (state) => {
      state.isLoading = true
      state.isError = null
    })
    .addCase(getProductsByOptionThunk.fulfilled, (state, action: PayloadAction<IProduct>) => {
      state.selectedProduct = action.payload
      state.isLoading = false,
      state.isError = null
    })
    .addCase(getProductsByOptionThunk.rejected, (state, action) => {
      state.isError = action.payload as string
      state.isLoading = false
    })

    .addCase(updateRatingProductThunk.pending, (state) => {
      state.isLoading = true
      state.isError = null
    })
    .addCase(updateRatingProductThunk.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
      state.allProducts = action.payload
      state.isLoading = false,
      state.isError = null
    })
    .addCase(updateRatingProductThunk.rejected, (state, action) => {
      state.isError = action.payload as string
      state.isLoading = false
    })
  }
}) 


export const {setProductsForEdit} = productsSlice.actions

export default productsSlice.reducer