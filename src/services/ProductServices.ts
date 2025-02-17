import axios, { AxiosInstance } from "axios";
import { IFormLogin, IFormRegister, IOptionProduct, IProduct } from "../types/types";
import { IFormEditProduct } from "../components/AdminUI/AddProduct/AddProductModal";


const instance: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:3000/",
});

export const getProducts = async (): Promise<IProduct[]> => {
  return instance.get("/products").then((res) => res.data);
}


export const getProductsByCategory = (brand: string): Promise<IProduct[]> => {
  return instance.get(`products/category${brand}`).then((res) => res.data)
}

export const getProductsByOption = async (data: IOptionProduct): Promise<IProduct> => {
  return instance.get("products/option",  {
    params: data,
  }).then((res) => res.data);
}


export const getProductById = (id: string): Promise<IProduct> => {
  return instance.get(`products/${id}`).then((res) => res.data);
}

export const createProduct = (data: IFormEditProduct) => {
  return instance.post("products", data).then((res) => res.data)
}

export const updateRatingProduct = (productId: string, data: {value : number} | IProduct): Promise<IProduct[]> => {
  return instance.put(`products/${productId}`, data).then((res) => res.data)
}

export const updateCountBuyProduct = (productId: string) => {
  return instance.post(`products/buy/${productId}`).then((res) => res.data)
}

export const updateProduct = (data: IFormEditProduct, productId: string) => {
  return instance.put(`products/${productId}`, data).then((res) => res.data)
}

export const deleteProduct = (productId: string) => {
  return instance.delete(`products/${productId}`).then((res) => res.data)
}


instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config
});