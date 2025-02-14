import axios, { AxiosInstance } from "axios";
import { IFormLogin, IFormRegister, IOptionProduct, IProduct } from "../types/types";


let instance: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:3000/",
});

export const getProducts = async (): Promise<IProduct[]> => {
  return instance.get("/products").then((res) => res.data);
}


export const getProductsByOption = async (data: IOptionProduct): Promise<IProduct> => {
  return instance.get("products/option",  {
    params: data,
  }).then((res) => res.data);
}


export const getProductById = (id: string): Promise<IProduct> => {
  return instance.get(`products/${id}`).then((res) => res.data);
}


export const updateProduct = (productId: string, data: {value : number} | IProduct): Promise<IProduct[]> => {
  return instance.put(`products/${productId}`, data).then((res) => res.data)
}

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config
});