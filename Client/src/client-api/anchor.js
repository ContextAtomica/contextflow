import axios from "axios";
import { BASE_URL } from "../config/axios-config";

const client = axios.create({
  baseURL: BASE_URL,
});

export const saveAnchor = (payload) => client.post(`/post-anchor`, payload);
export const saveResolutionPattern = (payload) =>
  client.post(`/save-pattern`, payload);
export const getAllAnchor = (payload) =>
  client.get(`/get-anchor`, { params: { payload } });
export const getResolutionPattern = (payload) =>
  client.get(`/get-resolution-pattern`, { params: { payload } });
export const getAllResolutionPattern = (payload) =>
  client.get(`/get-all-resolution-pattern`);

export const updateAnchorById = (payload) => client.put(`/update`, payload);
export const deleteAnchorById = (payload) =>
  client.delete("/delete", { data: payload });

const AnchorClientApi = {
  getAllAnchor,
  saveAnchor,
  updateAnchorById,
  deleteAnchorById,
  saveResolutionPattern,
  getResolutionPattern,
  getAllResolutionPattern,
};

export default AnchorClientApi;
