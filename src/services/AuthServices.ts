import axios, { AxiosInstance } from "axios";
import { IFormLogin, IFormRegister, IUser } from "../types/types";


const instance: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
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

export const updateAmountUser = (payload: {amount: number}): Promise<IUser> => {
  return instance.post("user/amount", payload).then((res) => res.data)
}

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config
});