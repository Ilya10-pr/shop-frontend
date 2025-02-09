import { createAsyncThunk } from "@reduxjs/toolkit";
import { authMe, loginUser, registerNewUser } from "../services/ProductServices";
import { IFormLogin, IFormRegister} from "../types/types";

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
    console.log(response)
    if(response.token){
      window.localStorage.setItem("token", response.token)
    }
    return response
  }
)

export const authMeThunk = createAsyncThunk(
  "auth/authMeThunk",
  async () => {
    const response = await authMe();
    return response;
  }
);





