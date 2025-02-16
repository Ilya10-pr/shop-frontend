import axios, { AxiosInstance } from "axios";
import { IComment } from "../types/types";


const instance: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:3000/",
});

export const createComment = (data: IComment): Promise<IComment[]>=> {
 return instance.post("comment", data).then((res) => res.data)

}

export const getCommentsOfUsers = (): Promise<IComment[]> => {
  return instance.get("comment").then((res) => res.data)
}