import { createAsyncThunk } from "@reduxjs/toolkit";
import { authMe, loginUser, registerNewUser, updateUser } from "../../services/AuthServices";
import { IFormLogin, IFormRegister} from "../../types/types";
import { getCartUserThunk } from "../cart/cartThunk";

export const registerUserThunk = createAsyncThunk(
  "auth/registerUserThunk",
  async (body: IFormRegister) => {
    const response = await registerNewUser(body);
    if(response.token){
      window.localStorage.setItem("token", response.token)
    }
    return response;
  }
);


export const loginUserThunk = createAsyncThunk(
  "auth/loginUserThunk",
  async (body: IFormLogin) => {
    const response = await loginUser(body);
    if(response.token){
      window.localStorage.setItem("token", response.token)
    }
    return response
  }
)

export const authMeThunk = createAsyncThunk(
  "auth/authMeThunk",
  async (_, {dispatch}) => {
    const response = await authMe();
    if(response){
          dispatch(getCartUserThunk())
        }
    return response;
  }
);


export const updateUserThunk = createAsyncThunk(
  "auth/updateUserThunk",
  async(payload: {amount: number}) => {
    const response = await updateUser(payload)
    return response 
  }
)




