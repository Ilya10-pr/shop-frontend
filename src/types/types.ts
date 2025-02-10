import { ReactNode } from "react";

export interface CartButtonProps {
  itemId: string; 
  product: IProduct;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  role?: string[];
  token?:string;
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
  price: number;
  image: string;
  category: string;
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
