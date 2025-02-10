import axios, { AxiosInstance } from "axios";
import { IFormLogin, IFormRegister, IProduct, IUser } from "../types/types";
// import { IProduct, IProduct2, IProductResponse } from "../types/ProductInterface";


let instance: AxiosInstance = axios.create({
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // "API-KEY": "e8c0cd71-2c4c-4d0a-93dd-9ab37b89e3b8",
  },
  baseURL: "http://localhost:3000/",
});


export const registerNewUser = (data: IFormRegister): Promise<IUser> => {
  return instance.post("auth/register", data).then((res) => res.data);
}

export const loginUser = (data: IFormLogin): Promise<IUser> => {
  return instance.post("auth/login", data).then((res) => res.data);
}

export const authMe = (): Promise<IUser> => {
  return instance.get("auth/me").then((res) => res.data);
}


export const getProducts = async () => {
  return instance.get<IProduct[]>("/products").then((res) => res.data);
}


export const getProductsByCategory = async (category: string): Promise<IProduct[]> => {
  return instance.get(`products/category${category}`).then((res) => res.data);
}


export const getProductById = (id: string): Promise<IProduct> => {
  return instance.get(`products/${id}`).then((res) => res.data);
}


export const addProductToCart = async(product: IProduct) => {
  const response = await instance.post("cart", product);
  return response
}


export interface IResponseCart{
  _id: string;
  productsCart: IProduct[];
}

export const deleteProductFromCart = (productId: string) => {
  return instance.delete(`cart/${productId}`).then((res) => res.data);
}


export const getProductFromCart = (): Promise<IResponseCart[]> => {
  return instance.get("cart").then((res) => res.data)
}


instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config
});