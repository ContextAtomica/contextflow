import axios from "axios";
import { BASE_URL } from "../config/axios-config";

const client = axios.create({
  baseURL: BASE_URL,
});

export const UserRegister = (payload) => client.post(`/user/register`, payload);
export const UserLogin = (payload) => client.post(`/user/login`, payload);

export const getAccessToken = (payload) =>
  client.post(`/user/refresh_token`, payload);
const userLoginClientApi = {
  UserRegister,
  UserLogin,
  getAccessToken,
};

export default userLoginClientApi;
