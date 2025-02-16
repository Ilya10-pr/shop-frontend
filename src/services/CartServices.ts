import axios, { AxiosInstance } from "axios";
import { IProduct } from "../types/types";

const instance: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:3000/",
});


export const addProductToCart = async(payload: {productId: string}): Promise<IProduct[]> => {
  return await instance.post("cart", payload).then((res) => res.data);
}


export const deleteProductFromCart = (productId: string): Promise<IProduct[]> => {
  return instance.delete(`cart/${productId}`).then((res) => res.data);
}


export const getProductFromCart = (): Promise<IProduct[]> => {
  return instance.get("cart").then((res) => res.data)
}


instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config
});