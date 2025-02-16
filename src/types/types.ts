import { ReactNode } from "react";

export interface CartButtonProps {
  itemId: string; 
  product: IProduct;
}

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  role?: string;
  token?:string;
  productCount: number;
  amount: number
}

export interface IFormRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


export interface IProduct{
  _id: string; 
  name: string;
  description: string;
  image: string;
  price: number;
  brand: string;
  color: string;
  ram: number;
  rating: number;
  isStock: boolean;
  countBuy: number
}


export interface IFormLogin {
  email: string
  password: string
}



export interface ILayout {
  children?: ReactNode;
}


export interface IAuth {
  auth: IUser | null;
  loading: boolean;
  error: string | null;
}

export interface ICartState {
  cartUser: IProduct[] | null
  isLoading: boolean;
  isError: string | null;
}

export interface IProductState {
  allProducts: IProduct[] | null,
  selectedProduct: IProduct | null,
  productsForEdit: IProduct[] | null,
  isLoading: boolean;
  isError: string | null;
}

export interface IOptionProduct{
  name: string;
  color: string;
  ram: number;
}


export interface IComment{
  productId: string;
  userId: string;
  countStar: number;
  description?: string;
  avatar: string;
  firstName: string;
}
